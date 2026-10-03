async function verifyUrls() {
  const list = [
    { title: 'Unavailable', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/6a/08/f8/6a08f8f4-05ac-fe83-68b9-85e4f8cac8b1/mzaf_11447656297166015034.plus.aac.p.m4a' },
    { title: 'Feel', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/ec/07/89ec07d6-bc49-9e37-7eb2-98cf384ece2c/mzaf_757461899043186347.plus.aac.p.m4a' },
    { title: 'Fall', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/26/76/43267638-733c-c6e6-2252-9d6f448d3061/mzaf_9692574823920042259.plus.aac.p.m4a' },
    { title: 'IF', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dd/9c/2a/dd9c2a05-e9e7-6ea9-f04f-948f3e2cf81a/mzaf_9657912625387707820.plus.aac.p.m4a' },
    { title: 'FEM', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c1/8d/3a/c18d3a14-eb98-a7f4-b94c-2dabdd6b8a90/mzaf_15758329392578752168.plus.aac.p.m4a' },
    { title: 'Kante', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/95/10/f2951075-d458-14e8-554f-058b9c073dca/mzaf_3536277524110924180.plus.aac.p.m4a' },
    { title: 'Jowo', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8e/0f/8b/8e0f8bb6-a77f-b124-07b0-f5e1b332f5a5/mzaf_5095797864967625502.plus.aac.p.m4a' },
    { title: 'Over Dem', url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/29/d0/94/29d0942e-ebd8-fca4-0ee0-5819c519c0fe/mzaf_5949323175584436400.plus.aac.p.m4a' }
  ];

  for (const item of list) {
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      console.log(`${item.title}: HTTP ${res.status} [${res.headers.get('content-type')}] length: ${res.headers.get('content-length')}`);
    } catch (e) {
      console.error(`${item.title} ERROR:`, e.message);
    }
  }
}

verifyUrls();
