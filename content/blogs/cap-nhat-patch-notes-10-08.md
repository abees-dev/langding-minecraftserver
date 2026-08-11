---
title: "Nhật Ký Cập Nhật 10/08: WebPoint, Mốc Nạp & Server Selector"
date: "2026-08-10"
author: "Dev Team AetherMine"
category: "Patch Notes"
tags: ["Update", "Patch Notes", "WebPoint", "Nạp Point", "Lobby"]
excerpt: "Commit 10/08: module WebPoint lobby/claim, /server-selector, mốc nạp & streak (/mocnap, /streak-nap), Việt hóa tên quest và mở rộng chế tạo cung."
coverImage: "/images/blogs/patch-notes.png"
featured: false
---

# Nhật Ký Cập Nhật — 10/08/2026

Ngày commit: **nạp Point / đổi server** và polish quest + craft.

---

## 1. WebPoint & chọn server

* Hub: `/server-selector` — GUI chọn server gameplay (click trái vào server, click phải đổi Point tùy cấu hình).
* Claim jar: nhận thưởng pending sau khi đổi Point về đúng server.
* Placeholder số dư Point trên GUI.

---

## 2. Mốc nạp & streak

* `/mocnap` — claim thưởng theo mốc đổi Point (tính khi **claim**, không phải lúc web nạp).
* `/streak-nap` — thưởng chuỗi đổi Point.
* Quy đổi tham chiếu: **1 Point = 1.000** VNĐ hiển thị mốc (theo cấu hình server).

---

## 3. Khác

* Tên / mô tả quest daily-weekly dùng tiếng Việt (không còn id Mythic/MMOItems thô).
* Preview thưởng engagement / dailyquest hiện tên item khi resolve được.
* Mở rộng crafting vũ khí (thêm cung) trên configure.
