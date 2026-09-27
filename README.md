<!--
SPDX-FileCopyrightText: 2026 Department of Decentralization
SPDX-License-Identifier: MIT
-->

# ETHBerlinZwei

- Website of ETHBerlin ZWEI: hackathon August 23-25, 2019, Factory Görlitzer Park, Berlin; conference and workshops August 21-23, 2019, DAPPCON19, Technical University Berlin.
- Live at https://2019.ethberlin.org, served by GitHub Pages from `main`.
- Static HTML, CSS and JavaScript. No build step.

## Photos

- Page: `photos.html`, 270 photos in four day sections.
- Source: https://github.com/department-of-decentralization/ethberlin-2-photos, loaded from `raw.githubusercontent.com`.
- Conference photos by Anton Tal, weekend photographer unknown. Licensed CC BY-SA 4.0.

## Preview

```sh
python3 -m http.server 8019
```

- Open http://127.0.0.1:8019/. Photos need internet.

## Test

```sh
npm test
```

- Needs Node 22.8 or later. No dependencies.

## Licenses

- Site: MIT (`LICENSE`).
- `dist/paper-full.js`, paper.js: MIT (`dist/paper-LICENSE.txt`).
- `dist/jquery.min.js`, jQuery: MIT (`dist/jquery-LICENSE.txt`).
- `dist/jquery.magnific-popup.min.js` and `dist/magnific-popup.css`, Magnific Popup: MIT (`dist/magnific-popup-LICENSE.txt`).
- `font/bc-falster-grotesk-regular.otf`: Copyright (c) 2014 by Briefcase Type Foundry. All rights reserved.
- Photos: CC BY-SA 4.0, in their own repository.
