---
title: "Nhật Ký Cập Nhật 09/08: Cân Bằng Boss, TAB & GUI Chuyển Sinh"
date: "2026-08-09"
author: "Dev Team AetherMine"
category: "Patch Notes"
tags: ["Update", "Patch Notes", "Boss", "TAB", "Chuyển Sinh"]
excerpt: "Commit 09/08: điều chỉnh máu/sát thương boss, chuẩn hóa spawner cooldown, tinh chỉnh TAB/rank menu và GUI Chuyển Sinh load từ config."
coverImage: "/images/blogs/patch-notes.png"
featured: false
---

# Nhật Ký Cập Nhật — 09/08/2026

Ngày commit nghiêng về **tinh chỉnh cân bằng** và **UI** sau đợt combat/bang 08/08.

---

## 1. Combat & boss

* Điều chỉnh máu / sát thương boss theo công thức combat mới.
* Chuẩn hóa cooldown spawner.
* Reset Crit Power nền trong MythicLib stats (khớp `/stats`).
* Refine hiển thị mana / máu / level trên **TAB**.

---

## 2. Rank & VIP menu

* Cập nhật mô tả rank và quyền trong menu.
* Điều chỉnh permission / home settings cho VIP và các rank tù.

---

## 3. Core (cùng ngày)

* GUI `/chuyensinh` — material, tên, lore nút load từ `gui.yml` (dễ chỉnh copy người chơi).
* `/core config check|sync` — báo cáo / merge key config thiếu (dành cho vận hành server).
