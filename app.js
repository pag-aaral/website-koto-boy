let db = JSON.parse(localStorage.getItem("db")) || {
schedule:[],
messages:[]
};

function save(){
localStorage.setItem("db",JSON.stringify(db));
localStorage.setItem("update",Date.now());
}

/* REALTIME SYNC */
setInterval(()=>{

db = JSON.parse(localStorage.getItem("db")) || {
schedule:[],
messages:[]
};

if(typeof renderAdmin === "function") renderAdmin();
if(typeof renderStudent === "function") renderStudent();

},800);
