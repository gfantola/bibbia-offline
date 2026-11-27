# Bibbia offline

Bibbia digitale in un unico HTML, con interfaccia adattata a iPhone e lettura senza richieste di rete.

Apri `index.html` in un browser che supporti JavaScript locale. Su iPhone l’anteprima dell’app File potrebbe non eseguire il programma: occorre un’app che supporti HTML locali. Questa versione non installa una PWA; la sola visita via web non garantisce la successiva disponibilità offline.

## Funzioni

- Selezione libro, capitolo e versetto, salto ed evidenziazione.
- Ricerca per riferimento, anche `Mt 5,3-12`, e per parola o frase.
- Segnalibri, ultimo passo, preferenze e copie di sicurezza locali.
- Controlli flottanti discreti in basso a destra: A−, A+ e chiaro/scuro.
- Importazione di dataset JSON autorizzati ed esportazione di un nuovo HTML autonomo.

## Testo e diritti

È inclusa la **Diodati 1885**, dataset `ita1885` di [eBible.org](https://ebible.org/details.php?id=ita1885), dichiarato **Public Domain** dalla fonte: 66 libri, 1189 capitoli e 31095 righe di versetti. Il dataset non contiene i sette libri deuterocanonici del canone cattolico. È una traduzione storica, diversa dalla CEI 2008 e dal Lezionario.

**CEI 2008 non inclusa.** Non è stata individuata una licenza aperta esplicita per la redistribuzione integrale in questa applicazione. Le [note legali BibbiaEDU](https://www.bibbiaedu.it/site/twig/templates/v3/html/notelegali/) prevedono condizioni e riserve sui diritti. Verifica effettuata il 27 novembre 2026. L’importazione locale non conferisce diritti sul testo importato.

## File

- `index.html`: applicazione pronta, senza dipendenze esterne.
- `diodati-1885.json`: dataset incluso, utilizzabile anche per l’importazione.
- `template.html`: sorgente dell’interfaccia.
- `build.mjs`: rigenera l’HTML con Node.js, senza pacchetti aggiuntivi.
- `LEGGIMI.txt`: guida, formato di importazione, provenienza e limiti dettagliati.

Per rigenerare `index.html` esegui `node build.mjs` dalla cartella del progetto.

Preferenze e segnalibri dipendono dallo spazio locale del browser: esporta periodicamente una copia. Non vi è sincronizzazione tra dispositivi. Interfaccia verificata nel browser a larghezza mobile; apertura su iPhone fisico non verificata.
