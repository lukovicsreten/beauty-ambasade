# SEO izveštaj — Beauty Ambassade (beauty-ambassade.rs)

Datum: 25.07.2026.

## 1. Šta je urađeno

### Tehnički SEO
- **Meta title i description** — jedinstveni na svih 7 stranica, sa ključnim rečima i lokacijom ("Beograd", "Bežanijska Kosa"), u okviru preporučene dužine (title ≈ 50–60, description ≈ 140–155 karaktera).
- **Canonical tagovi** — dodati na svih 7 stranica, prema domenu `https://beauty-ambassade.rs/`.
- **sitemap.xml** — kreiran, sadrži svih 7 stranica.
- **robots.txt** — kreiran, dozvoljava indeksiranje i upućuje na sitemap.
- **netlify.toml** — dodat:
  - 301 redirekcija sa `www.beauty-ambassade.rs` na `beauty-ambassade.rs` (sprečava dupli sadržaj)
  - keš header-i: slike keširane godinu dana (retko se menjaju), CSS/JS na 1h sa revalidacijom (da izmene brzo stignu do posetilaca)
  - osnovni bezbednosni header-i (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- **Heading struktura** — svaka stranica ima tačno jedan H1. Na svih 6 stranica usluga H1 sada sadrži naziv usluge + lokaciju (npr. "Manikir – Salon Lepote Bežanijska Kosa"). Dodate FAQ sekcije koriste H2 (naslov sekcije) + H3 (pitanja) — logična hijerarhija.
- **Alt tekst na slikama** — pregledane i ispravljene sve slike na sajtu (hero, kartice usluga, sve galerije). Ranije su mnoge imale samo generičko ime usluge (npr. "Masaza" bez ž) ili su bile pogrešno označene (5 slika u galeriji na početnoj bilo je označeno kao "Depilacija" iako prikazuju enterijer/tretmane lica/pedikir opremu — vizuelno sam proverio i ispravio). Sada svaka slika ima opisan, jedinstven alt tekst sa ključnim rečima i lokacijom.
- **Slike/učitavanje** — hero slike na stranicama usluga koje ih imaju (depilacija, epilacija, masaža, šminka) dobile su `loading="eager"` i `fetchpriority="high"` (LCP optimizacija); ostale slike ispod pregiba već su imale `loading="lazy"`. Sve slike su već ranije kompresovane (najveća je 144 KB) — nema potrebe za dodatnom kompresijom.
- **Responzivnost** — sajt je već mobile-first responzivan (testirano ranije tokom izrade); nije bilo potrebe za izmenama.
- **Slomljeni linkovi** — proverio sam sve interne `src`/`href` reference na svih 7 stranica — nema slomljenih linkova ni 404 referenci.
- **HTTPS/redirekcije** — Netlify automatski forsira HTTPS; www→non-www redirekcija dodata kroz netlify.toml (vidi gore).

### Strukturirani podaci (Schema.org JSON-LD)
- **BeautySalon/LocalBusiness** na početnoj stranici — ime, adresa (Bežanijska Kosa, Beograd), geo-koordinate, radno vreme, email, Instagram (sameAs), područje usluživanja (Beograd, Novi Beograd, Bežanijska Kosa).
- **Service schema** na svih 6 stranica usluga, povezan sa istim provider podacima.
- **BreadcrumbList schema** na svih 6 stranica usluga (Početna → Usluge → [Usluga]).
- **FAQPage schema** na svih 6 stranica usluga, uparen sa vidljivom FAQ sekcijom na stranici (Google zahteva da se schema poklapa sa vidljivim sadržajem).
- **Nisam dodao AggregateRating/Review schema** — namerno. Testimonijali na sajtu su placeholder tekstovi, ne prave recenzije. Dodavanje ocena/schema bez pravih Google recenzija krši Google-ova pravila za strukturirane podatke i može dovesti do ručne kazne (manual action). Ovo prvo treba rešiti prikupljanjem pravih recenzija (vidi preporuke ispod).

### On-page sadržaj
- Stranice usluga (manikir, pedikir, depilacija, epilacija, masaža, šminka) već imaju opsežan sadržaj (znatno preko 300–400 reči po strani — neke i po 1500+ reči jer smo ih zajedno gradili kroz više izmena).
- H1 na svakoj stranici usluge sada sadrži i naziv usluge i lokaciju.
- **FAQ sekcija dodata na svih 6 stranica usluga** (po 4 pitanja/odgovora, relevantna za tu uslugu), uz FAQPage schema — ovo pomaže za "People also ask" i long-tail pretrage.
- Interno povezivanje: svaka stranica usluge ima link nazad na "Sve usluge" (početna, #services) i navigaciju ka ostalim sekcijama početne strane. Nema posebnog bloga trenutno.

### Lokalni SEO
- NAP (Name/Address/Phone) — ime i adresa su sada usklađeni svuda gde se pominju (kontakt sekcija na početnoj, schema markup): "Beauty Ambassade", "Bežanijska Kosa, Beograd". **Telefon nedostaje** — vidi hitne preporuke ispod.
- Google mapa (embed) na kontakt sekciji početne strane — već je bila dodata ranije u razvoju sajta (OpenStreetMap embed, jer je Google-ov besplatni embed format bio blokiran na mobilnim uređajima).
- Kontakt sekcija sa radnim vremenom, lokacijom, Instagram i email kontaktom postoji na početnoj strani. Nema posebne pod-stranice isključivo za adresu, ali kontakt sekcija ima sve što je potrebno (mapa + link "Otvori u Google Maps").

## 2. Šta NISAM uradio i zašto

- **Nisam menjao naslov (H1) na početnoj strani** ("Lepota je ambasada tvog stila") — to je brendirana poruka, ne krši SEO pravila (postoji tačno jedan H1), a keyword pokrivenost za "Beograd"/"Bežanijska Kosa" sada dolazi iz meta title-a, eyebrow teksta odmah iznad H1 ("Salon lepote · Beograd, Bežanijska Kosa") i About sekcije. Javi ako ipak želiš da H1 doslovno sadrži te reči.
- **Nisam minifikovao CSS/JS.** Ušteda bi bila svega ~8 KB ukupno — zanemarljivo u poređenju sa slikama (100–150 KB svaka) koje dominiraju veličinom strane. Minifikacija bi zahtevala održavanje dve verzije fajlova (izvorna + minifikovana) bez build alata, što bi zakomplikovalo dalje izmene. Ako želiš, mogu da to uradim naknadno.
- **Nisam dodao lažne recenzije/ocene** — vidi objašnjenje gore.
- **Nisam pronašao/izmislio tačnu adresu** (broj zgrade, ulica) niti telefon — nemam te podatke. Schema trenutno koristi samo "Bežanijska Kosa" kao streetAddress, što je manje precizno nego prava adresa.

## 3. Preporuke koje zahtevaju tvoju akciju (nisu tehničke, ne mogu ih ja uraditi)

### 🔴 Prioritet 1 — najveći efekat, uradi prvo
1. **Google Business Profile (Google My Business)** — ako još nije napravljen, napravi profil za "Beauty Ambassade" sa tačnom adresom, telefonom, radnim vremenom i kategorijom "Beauty salon". Ovo je JEDAN od najjačih signala za lokalne pretrage poput "salon lepote Bežanijska Kosa".
2. **Dodaj telefon** — sajt trenutno nema nijedan broj telefona. I NAP konzistentnost i Google Business Profile zahtevaju telefon. Pošalji mi broj pa ću ga dodati na sajt i u schema markup.
3. **Google Search Console** — prijavi `https://beauty-ambassade.rs/` i pošalji sitemap.xml (`https://beauty-ambassade.rs/sitemap.xml`) ručno kroz Search Console da ubrzaš indeksiranje.
4. **Prikupi prave Google recenzije** — čim budeš imao par recenzija na Google Business Profile-u, javi mi da dodam pravu AggregateRating schema (sa stvarnim brojem i ocenom, nikad izmišljenim).

### 🟡 Prioritet 2 — važno, sledeći korak
5. **Tačna adresa** — pošalji mi ulicu i broj (ne samo "Bežanijska Kosa") da ažuriram schema markup i kontakt sekciju na precizniju adresu — ovo dodatno pomaže Google Maps i lokalnom rangiranju.
6. **Bing Webmaster Tools** — isti sitemap, manji ali besplatan dodatni izvor saobraćaja.
7. **Konzistentnost NAP na drugim platformama** — proveri da isto ime/adresa/telefon stoje na Instagram profilu, Facebook-u (ako postoji) i eventualnim beauty-salon direktorijumima (npr. Yellow pages Srbija, Firma.li, Imenik.rs).

### 🟢 Prioritet 3 — dugoročno
8. **Backlink strategija** — kontaktiraj lokalne beauty blogove/influencere iz Beograda za pomen/link ka sajtu; prijava na lokalne biznis direktorijume takođe gradi autoritet.
9. **Redovan sadržaj** — ako budeš imao vremena/volje, blog sekcija sa SEO tekstovima (npr. "Kako se pripremiti za lasersku epilaciju") dodatno privlači long-tail pretrage — trenutno sajt nema blog, ovo je opciono.
10. **Core Web Vitals monitoring** — nakon što sajt bude neko vreme live, proveri stvarne podatke u Google Search Console → Core Web Vitals izveštaju (ovo zahteva realan saobraćaj, ne može se simulirati unapred).

## 4. Tehnički rezime izmenjenih/dodatih fajlova
- `index.html` — meta tagovi, canonical, LocalBusiness schema, lokacija, alt tekstovi (uključujući ispravke netačnih)
- `usluge/manikir.html`, `pedikir.html`, `depilacija.html`, `epilacija.html`, `masaza.html`, `sminka.html` — meta tagovi, canonical, Service + BreadcrumbList + FAQPage schema, H1 sa lokacijom, FAQ sekcija, alt tekstovi, loading/fetchpriority na hero slikama gde postoje
- `css/style.css` — stilovi za FAQ sekciju
- `sitemap.xml` — novo
- `robots.txt` — novo
- `netlify.toml` — novo (redirekcije + keš + bezbednosni header-i)
- `SEO-izvestaj.md` — ovaj fajl
