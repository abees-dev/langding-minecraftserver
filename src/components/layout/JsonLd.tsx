import React from 'react';
import { siteConfig } from '@/config/site';
import { FAQ_LIST } from '@/constants/faq';

export default function JsonLd() {
  const { serverIp, websiteUrl, bannerUrl } = siteConfig;

  // VideoGame & GameServer Schema
  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    'name': 'AetherMine Minecraft RPG Server',
    'alternateName': ['AetherMine', 'AetherMine RPG'],
    'description': `Máy chủ Minecraft RPG Việt Nam thế hệ mới (IP: ${serverIp}). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện giáp Long Tộc, đại chiến Bang Hội KOTH Mỏ VIP và Chuyển Sinh bứt phá sức mạnh thuộc tính nhập vai.`,
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
      'name': siteConfig.author,
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

  // FAQPage Schema dynamically built from FAQ_LIST
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_LIST.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  };

  // SiteNavigationElement Schema for Sitelinks
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': siteConfig.navLinks.map((link, idx) => ({
      '@type': 'SiteNavigationElement',
      'position': idx + 1,
      'name': link.name,
      'url': `${websiteUrl}/${link.href}`,
    })),
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteConfig.fullName,
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
    'name': siteConfig.fullName,
    'url': websiteUrl,
    'logo': `${websiteUrl}/icon-512.png`,
    'sameAs': [
      siteConfig.social.facebook,
      siteConfig.social.discord,
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
