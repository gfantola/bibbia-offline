# Bibbia offline · CEI 2008

Lettore in un unico HTML con i testi CEI 2008 ricavati dall’EPUB fornito dall’utente. L’interfaccia del progetto è conservata, inclusi i comandi flottanti A−, A+ e chiaro/scuro.

## Lettura e funzioni

- 73 libri, con entrambi i testi di Ester, greco ed ebraico.
- Navigazione libro, capitolo e versetto; riferimenti come `Gv 3,16`, `Mt 5,1-12`, `Est 1,1a`, `Est ebraico 9,30`.
- Ricerca testuale di parole e frasi, senza distinzione di maiuscole o accenti.
- Segnalibri di singoli versetti o intervalli; quattro colori di evidenziazione permanente.
- Carattere classico o lineare, dimensione e interlinea regolabili; temi chiaro, scuro e carta.
- Esportazione e ripristino di segnalibri, colori e preferenze. Accettati anche i preferiti esportati dal lettore CEI creato nella chat, se riferiti allo stesso EPUB.
- Importazione di dataset JSON schema 1 e 2, ed esportazione di un HTML con il testo attuale.

Su PC aprire `index.html` con un browser. Su iPhone serve un’app che esegua JavaScript negli HTML locali: l’anteprima di File può non attivare i comandi. Una visita al sito GitHub Pages non garantisce la successiva disponibilità offline: per la copia autonoma usare **Testo, importazione e guida → Scarica HTML con il testo attuale**. Questa versione non installa una PWA.

## Fonte e verifica

Fonte: `la-sacra-bibbia.epub`, metadati «La Sacra Bibbia CEI 2008», preghiamo.org, giugno 2013. Testo fornito dall’utente per il proprio lettore. La disponibilità del codice del lettore non attribuisce una licenza aperta alla traduzione CEI.

Sono presenti **1.338 sezioni di capitolo e 35.726 unità di versetto**; il conteggio comprende separatamente i 10 capitoli greci e i 10 ebraici di Ester e le etichette alfabetiche. Acquisiti tutti i 35.208 marcatori in apice e 518 versetti da 15 tabelle. Tutti i capitoli attesi sono presenti; nessun capitolo o versetto indicizzato è vuoto.

Il testo estratto è stato confrontato integralmente con l’EPUB, normalizzando gli spazi e riducendo solo ripetizioni esatte già presenti in 310 celle delle tabelle. Nei capitoli interessati si può consultare il testo delle celle originali. Sono conservati i salti, i riordini, le lettere e la doppia numerazione dei Salmi della fonte. In particolare, `Est greco 9,30` non ha un marcatore nella fonte e viene segnalato come non presente. Non sono stati ricostruiti testi mancanti. Questa verifica della conversione non è una collazione integrale con un’edizione ufficiale CEI.

I Salmi si raggiungono con il primo numero del titolo, come nell’EPUB. Il numero tradizionale fra parentesi resta visibile. `Nm 25,19` raggiunge l’unità che la fonte colloca all’inizio del capitolo 26.

## File e sviluppo

- `index.html`: lettore pronto, con tutto il dataset incorporato.
- `template.html`: interfaccia e programma, con un unico `DATA_PLACEHOLDER`.
- `cei-2008.json`: dataset schema 2, fonte e verifica incluse.
- `build.mjs`: rigenera l’HTML senza dipendenze aggiuntive.
- `tests/reader.cjs`: controlli dei riferimenti, dei casi editoriali e dei salvataggi.
- `VERIFICA-CEI-2008.txt`: rapporto dettagliato della conversione.
- `diodati-1885.json`: precedente dataset opzionale, conservato per compatibilità; non è il testo predefinito.

Eseguire `node build.mjs` e `node tests/reader.cjs` dalla cartella del progetto.

Nel **schema 2**, le chiavi di `chapters` e il campo numerico `verse` sono posizioni interne stabili, non necessariamente il riferimento biblico. Il riferimento originale è conservato in `chapterInfo[chiave].n`, `.section`, `.title` e `label` del versetto. Le parti di versetto e l’ordine della fonte restano distinti: evitare di convertire `label` in un semplice numero. Ester mantiene 73 libri complessivi usando due varianti dentro lo stesso libro. Il formato schema 1 numerico resta importabile.

Preferenze e salvataggi restano nel browser e non si sincronizzano fra dispositivi. I vecchi segnalibri della Diodati restano separati da quelli CEI; non vengono associati automaticamente a una traduzione diversa. Un dataset diverso importato in precedenza non sostituisce automaticamente la nuova CEI all’avvio.
