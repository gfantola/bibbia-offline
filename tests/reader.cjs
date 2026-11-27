const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=JSON.parse(fs.readFileSync('cei-2008.json','utf8'));
class El{
 constructor(tag='div'){this.tag=tag;this.children=[];this._value='';this.textContent='';this.dataset={};this.style={setProperty(){}};this.classList={toggle(){},add(){},remove(){}};this.files=[];this.attrs={}}
 get value(){return this.tag==='select'?(this.children.find(x=>x._value===this._value)||this.children[0])?._value||'':this._value}
 set value(v){this._value=String(v)}
 append(...a){this.children.push(...a)}replaceChildren(...a){this.children=[...a];this._value=''}setAttribute(k,v){this.attrs[k]=v}removeAttribute(k){delete this.attrs[k]}showModal(){this.open=true}close(){this.open=false}click(){this.onclick?.()}remove(){}scrollIntoView(){}cloneNode(){return this}
}
const els=new Map(),selects=new Set(['book','chapter','verse','verseEnd','variant','theme','leading','fontFamily']);
const get=id=>{if(!els.has(id))els.set(id,new El(selects.has(id)?'select':'div'));return els.get(id)};
get('embeddedData').textContent=JSON.stringify(data);
const memory=new Map(),doc={getElementById:get,querySelectorAll(){return []},createElement:t=>new El(t),createTextNode:t=>({textContent:t}),documentElement:new El(),body:new El()};
const context=vm.createContext({document:doc,matchMedia:()=>({matches:false,addEventListener(){}}),localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},requestAnimationFrame:f=>f(),setTimeout:()=>0,Blob,URL,alert:msg=>{throw Error(msg)},console});
vm.runInContext(fs.readFileSync('template.html','utf8').replace(/\r/g,'').split("<script>\n'use strict';")[1].split('</script>')[0].replace(/^/,"'use strict';"),context);
const run=code=>vm.runInContext(code,context);
assert.equal(run('data.books.length'),73);assert.equal(run('index.length'),35726);assert.equal(get('edition').textContent,'CEI 2008');
for(const q of ['Gv 3,16','Mt 5,1-12','1 Cor 13','Est ebraico 9,30','Est greco 1,1a','Nm 25,19','Sal 10,1','Sal 115,1','Sal 119,176','Lam 3,66','Gb 31,35-40','Sir 17,8-11']){const p=run(`resolveReference(${JSON.stringify(q)})`);assert.ok(!p.error,q+': '+p.error);assert.ok(run(`navigate(${JSON.stringify(p)},false)`),q)}
assert.ok(run("resolveReference('Est greco 9,30').error"));assert.ok(run("resolveReference('Mt 5,12-1').error"));
run("navigate(resolveReference('Gv 3,16'),false)");assert.equal(run('same(state,{book:state.book,chapter:state.chapter,start:state.start,end:state.end})'),true);
run("navigate(resolveReference('Gb 31,35-40'),false)");assert.equal(run('selectedVerses().length'),7);assert.equal(run('selectedVerses().map(label).join(\",\")'),'38,39,40a,35,36,37,40b');
const count=run(`(()=>{let count=0;for(const b of data.books)for(const c of chapters(b))for(const v of b.chapters[c]){const ci=info(b,c);const ref=/^\\d+,\\d+$/.test(label(v))?b.name+' '+label(v):b.name+(ci.section==='Testo ebraico'?' ebraico':ci.section==='Testo greco'?' greco':'')+' '+ci.n+','+refLabel(v);const p=resolveReference(ref);if(!p||p.error||p.book!==b.id||p.chapter!==c||!selected(v,p))throw Error(ref+' failed');count++}return count})()`);assert.equal(count,35726);
run("navigate(resolveReference('Gv 3,16'),false);highlights[highKey(state,state.start)]='yellow';marks.push(passage(state));persist();setData(builtIn)");assert.equal(run('marks.length'),1);assert.equal(run('Object.keys(highlights).length'),1);assert.match(run('reference()'),/Giovanni 3,16/);
assert.equal(run("validate({schemaVersion:1,id:'test',title:'Test',license:'Personal',source:'Test',books:[{id:'MAT',name:'Matteo',aliases:['Mt'],testament:'NT',chapters:{'5':[{verse:3,text:'Testo'}]}}]}).books.length"),1);
const legacy={format:'bibbia-cei2008-v1',source:data.sourceHash,state:{fav:{'49:2:15':true},high:{'49:2:15':'yellow'}}};context.legacy=legacy;run('importPersonalReaderBackup(legacy)');assert.ok(run('Object.keys(highlights).length')>=1);
run("$('book').value='EST';variantOptions(book('EST'));chapterOptions()");assert.equal(get('chapter').children.length,10);get('variant').value='Testo ebraico';run('chapterOptions()');assert.equal(get('chapter').children[0].value,'11');
run("navigate(resolveReference('Ap 22,21'),false)");assert.equal(get('next').disabled,true);run("navigate(resolveReference('Gn 1,1'),false)");assert.equal(get('previous').disabled,true);
console.log('PASS: complete source conservation, 35726 resolvable verse labels, ranges with reordered verses, Ester variants, source anomalies, bookmarks/highlights persistence, original reader backup, schema-1 compatibility, chapter selectors and boundaries.');


// Optional endpoint: single verse, ranges, dependent selectors, letters and reordered source.
run("navigate(resolveReference('Gv 3,16'),false)");assert.equal(get('verseEnd').value,'');
get('verse').value='16';run("finalVerseOptions()");get('navigate').onsubmit({preventDefault(){}});assert.equal(run('selectedVerses().length'),1);
get('verseEnd').value='18';get('navigate').onsubmit({preventDefault(){}});assert.equal(run('selectedVerses().length'),3);assert.match(run('reference()'),/3,16–18/);assert.equal(get('verseEnd').value,'18');
get('verse').value='19';get('verse').onchange();assert.equal(get('verseEnd').value,'');assert.ok(get('verseEnd').children.slice(1).every(o=>+o.value>=19));
get('chapter').value='4';get('chapter').onchange();assert.equal(get('verseEnd').value,'');assert.equal(get('verse').value,'1');
run("navigate(resolveReference('Mt 5,3-12'),false)");assert.equal(get('verse').value,'3');assert.equal(get('verseEnd').value,'12');get('verseEnd').value='';get('navigate').onsubmit({preventDefault(){}});assert.equal(run('selectedVerses().length'),1);
run("navigate(resolveReference('Gb 31,35-40'),false)");assert.equal(run('label(book().chapters[state.chapter].find(v=>v.verse===+$("verse").value))'),'35');get('navigate').onsubmit({preventDefault(){}});assert.equal(run('selectedVerses().length'),7);
run("navigate(resolveReference('Est greco 1,1a'),false)");assert.equal(get('verseEnd').value,'');assert.ok(get('verseEnd').children.some(o=>o.textContent==='1b'));get('verseEnd').value=get('verseEnd').children.find(o=>o.textContent==='1b').value;get('navigate').onsubmit({preventDefault(){}});assert.equal(run('selectedVerses().length'),2);
run("navigate(resolveReference('Nm 25,19'),false)");assert.equal(get('verseEnd').value,'');get('navigate').onsubmit({preventDefault(){}});assert.match(run('reference()'),/25,19/);
run("navigate(resolveReference('Ap 22,21'),false)");assert.equal(get('verseEnd').children.length,2);
console.log('PASS: optional final verse, single/range form submission, endpoint constraints and resets, search synchronization, reordered and lettered CEI verses.');

