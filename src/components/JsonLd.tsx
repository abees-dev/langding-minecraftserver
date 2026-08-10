import React from 'react';

export default function JsonLd() {
  const serverIp = 'mc.aethermines.com';
  const websiteUrl = 'https://aethermines.com';
  const bannerUrl = 'https://aethermines.com/og-image.png';

  // VideoGame & GameServer Schema
  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    'name': 'AetherMine Minecraft RPG Server',
    'alternateName': ['AetherMine', 'AetherMine RPG'],
    'description': 'Máy chủ Minecraft RPG Việt Nam thế hệ mới (IP: mc.aethermines.com). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện giáp MMOItems Long Tộc, đại chiến Bang Hội KOTH Mỏ VIP và Chuyển Sinh bứt phá sức mạnh thuộc tính nhập vai.',
    'image': bannerUrl,
    'genre': ['Minecraft RPG', 'RPG', 'Prison RPG', 'Action RPG', 'Survival', 'Multiplayer'],
    'gamePlatform': 'PC Game',
    'operatingSystem': 'Windows, macOS, Linux',
    'applicationCategory': 'Game',
    'url': websiteUrl,
    'inLanguage': 'vi-VN',
    'playMode': 'MultiPlayer',
    'numberOfPlayers': {
      '@type': 'QuantitativeValue',
      'minValue': 1,
      'maxValue': 500,
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '420',
      'bestRating': '5',
      'worstRating': '1',
    },
    'author': {
      '@type': 'Organization',
      'name': 'AetherMine Studio',
      'url': websiteUrl,
      'founder': {
        '@type': 'Person',
        'name': 'Abeess',
      },
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'VND',
      'availability': 'https://schema.org/InStock',
    },
  };

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Tìm server Minecraft RPG Việt Nam nào hay nhất hiện nay?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `AetherMine là server Minecraft RPG kết hợp Prison thế hệ mới tại Việt Nam. Người chơi được trải nghiệm chuỗi nhiệm vụ RPG, đào quặng, săn Boss Dungeon, chế đồ MMOItems Long Tộc và Chuyển Sinh mở cây thuộc tính RPG độc đáo. IP tham gia: ${serverIp}.`,
        },
      },
      {
        '@type': 'Question',
        'name': 'Làm thế nào để kết nối vào máy chủ AetherMine Minecraft RPG?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Mở Minecraft Java Edition phiên bản 1.19.4 trở lên, chọn Chơi Mạng (Multiplayer) -> Thêm Máy Chủ (Add Server), nhập địa chỉ IP chính thức: ${serverIp} và tham gia ngay!`,
        },
      },
      {
        '@type': 'Question',
        'name': 'Hệ thống Bán Quặng Multiplier Bang Hội hoạt động ra sao?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Bán cá nhân /sellgui dùng bảng giá Base đồng bộ. Khi tham gia Bang Hội, người chơi gửi quặng vào /gang vault và Sell All để hưởng Multiplier (+10%/lv), Buff 2X Shop và Paragon Sell.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Có bao nhiêu cấp Rank trong AetherMine Minecraft RPG?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Có 9 cấp Rank chính: Tân Binh, Tù Nhân, Lao Công, Thợ Đào, Đội Trưởng, Phó Quản Ngục, Quản Ngục, Bá Chủ Ngục Tù và Vượt Ngục cùng các gói VIP Donor.',
        },
      },
    ],
  };

  // SiteNavigationElement Schema for Sitelinks
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'SiteNavigationElement',
        'position': 1,
        'name': 'Tính Năng Lối Chơi',
        'description': 'Đào quặng Prison, chế đồ MMOItems & Boss Dungeon RPG',
        'url': `${websiteUrl}/#features`,
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 2,
        'name': 'Hệ Thống Rank & VIP',
        'description': '9 Cấp Rank Prison & Đặc quyền VIP Donors',
        'url': `${websiteUrl}/#ranks`,
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 3,
        'name': 'Bán Quặng Bang Hội',
        'description': 'Multiplier bán quặng Bang Hội & KOTH Mỏ VIP',
        'url': `${websiteUrl}/#economy`,
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 4,
        'name': 'Câu Hỏi Thường Gặp (FAQ)',
        'description': 'Giải đáp thắc mắc người chơi mới',
        'url': `${websiteUrl}/#faq`,
      },
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'AetherMine Minecraft RPG Server',
    'url': websiteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${websiteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'AetherMine Minecraft RPG Server',
    'url': websiteUrl,
    'logo': `${websiteUrl}/logo.png`,
    'sameAs': [
      'https://facebook.com/aethermine',
      'https://discord.gg/mvRcGjDHVm',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
