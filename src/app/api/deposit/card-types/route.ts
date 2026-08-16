import { NextResponse } from 'next/server';
import { TelcoType } from '@/types/deposit';

export interface TelcoInfo {
  id: TelcoType;
  name: string;
  fees?: number;
  availableAmounts: number[];
}

const DEFAULT_TELCOS: TelcoInfo[] = [
  {
    id: 'VIETTEL',
    name: 'Viettel',
    availableAmounts: [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000],
  },
  {
    id: 'MOBIFONE',
    name: 'Mobifone',
    availableAmounts: [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000],
  },
  {
    id: 'VINAPHONE',
    name: 'Vinaphone',
    availableAmounts: [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000],
  },
  {
    id: 'ZING',
    name: 'Zing',
    availableAmounts: [10000, 20000, 50000, 100000, 200000, 500000, 1000000],
  },
  {
    id: 'GARENA',
    name: 'Garena',
    availableAmounts: [5000, 10000, 20000, 50000, 100000, 200000, 500000],
  },
  {
    id: 'VCOIN',
    name: 'Vcoin',
    availableAmounts: [10000, 20000, 50000, 100000, 200000, 300000, 500000, 1000000],
  },
  {
    id: 'APPOTA',
    name: 'Appota',
    availableAmounts: [50000, 100000, 200000, 500000, 1000000],
  },
  {
    id: 'SCOIN',
    name: 'Scoin',
    availableAmounts: [50000, 100000, 200000, 500000, 1000000],
  },
  {
    id: 'GATE',
    name: 'Gate',
    availableAmounts: [20000, 50000, 100000, 200000, 500000],
  },
];

const TELCO_NAME_MAP: Record<string, string> = {
  VIETTEL: 'Viettel',
  MOBIFONE: 'Mobifone',
  VINAPHONE: 'Vinaphone',
  ZING: 'Zing',
  GARENA: 'Garena',
  APPOTA: 'Appota',
  VCOIN: 'Vcoin',
  SCOIN: 'Scoin',
  GATE: 'Gate',
  VNMOBILE: 'Vietnamobile',
};

export async function GET() {
  const debugInfo: any = {
    partnerIdConfigured: false,
    partnerId: '',
    getFeeUrl: '',
    httpStatus: null,
    rawResponseBody: null,
    parseError: null,
    fetchError: null,
    isFallback: false,
  };

  try {
    const partnerId = process.env.CARD_PARTNER_ID || '';
    const partnerBaseUrl = process.env.CARD_PARTNER_URL
      ? process.env.CARD_PARTNER_URL.replace(/\/chargingws\/v2\/?$/, '')
      : 'https://nappay.vn';

    debugInfo.partnerId = partnerId ? `${partnerId.slice(0, 3)}***` : 'MISSING';
    debugInfo.partnerIdConfigured = Boolean(partnerId);

    let telcoList: TelcoInfo[] = [...DEFAULT_TELCOS];

    if (partnerId) {
      const getFeeUrl = `${partnerBaseUrl}/chargingws/v2/getfee?partner_id=${partnerId}`;
      debugInfo.getFeeUrl = getFeeUrl;

      console.log('====================================================');
      console.log('[Card Types Debug] Starting fetch to Nappay.vn API:');
      console.log(`[Card Types Debug] CARD_PARTNER_ID: "${partnerId}"`);
      console.log(`[Card Types Debug] Target Fee URL: "${getFeeUrl}"`);
      console.log('====================================================');

      try {
        const res = await fetch(getFeeUrl, {
          headers: { Accept: 'application/json' },
          cache: 'no-store', // Disable caching during debug
        });

        debugInfo.httpStatus = res.status;
        console.log(`[Card Types Debug] HTTP Status Code: ${res.status} ${res.statusText}`);

        const rawText = await res.text();
        debugInfo.rawResponseBody = rawText;
        console.log('[Card Types Debug] Raw Nappay Response Body:');
        console.log(rawText);

        if (res.ok) {
          try {
            const feeData = JSON.parse(rawText);
            console.log('[Card Types Debug] Parsed JSON Response:', JSON.stringify(feeData, null, 2));

            if (feeData && typeof feeData === 'object') {
              const fetchedTelcos: TelcoInfo[] = [];

              for (const key of Object.keys(feeData)) {
                const uppercaseKey = key.toUpperCase() as TelcoType;
                const items = feeData[key];

                if (Array.isArray(items) && items.length > 0) {
                  const availableAmounts = items
                    .map((item: any) => Number(item.value || item.card_value))
                    .filter((val: number) => !isNaN(val) && val > 0)
                    .sort((a: number, b: number) => a - b);

                  const fees = items[0]?.fees ? Number(items[0].fees) : undefined;
                  const name = TELCO_NAME_MAP[uppercaseKey] || uppercaseKey;

                  fetchedTelcos.push({
                    id: uppercaseKey,
                    name,
                    fees,
                    availableAmounts:
                      availableAmounts.length > 0
                        ? availableAmounts
                        : [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000],
                  });
                }
              }

              if (fetchedTelcos.length > 0) {
                telcoList = fetchedTelcos;
                console.log('[Card Types Debug] Successfully parsed telcos:', fetchedTelcos);
              } else {
                console.warn('[Card Types Debug] Nappay API returned empty array. Using fallback defaults.');
                debugInfo.isFallback = true;
              }
            }
          } catch (jsonErr: any) {
            debugInfo.parseError = jsonErr?.message;
            console.error('[Card Types Debug] Failed to parse partner JSON:', jsonErr?.message);
            debugInfo.isFallback = true;
          }
        } else {
          console.error(`[Card Types Debug] Nappay API returned non-OK status: ${res.status}`);
          debugInfo.isFallback = true;
        }
      } catch (err: any) {
        debugInfo.fetchError = err?.message;
        console.error('[Card Types Debug] Fetch request thrown exception:', err?.message);
        debugInfo.isFallback = true;
      }
    } else {
      console.warn('[Card Types Debug] CARD_PARTNER_ID environment variable is NOT set. Using fallback defaults.');
      debugInfo.isFallback = true;
    }

    return NextResponse.json({
      success: true,
      telcos: telcoList,
      debug: debugInfo,
    });
  } catch (error: any) {
    console.error('[Get Card Types Root API Error]:', error);
    debugInfo.fetchError = error?.message;
    debugInfo.isFallback = true;

    return NextResponse.json({
      success: true,
      telcos: DEFAULT_TELCOS,
      debug: debugInfo,
    });
  }
}
