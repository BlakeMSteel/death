(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,i){e.exports=i(26)},23:function(e,t,i){},24:function(e,t,i){},26:function(e,t,i){"use strict";i.r(t);var n=i(13),a=i.n(n),r=i(16),o=i.n(r);i(23),i(24);var s=function(){return a.a.createElement("div",{className:"App"})},c=i(0),l=i(1),h=i(6),u=function(){function e(t){Object(c.a)(this,e),this._entities=void 0,this._entities=new Array(t)}return Object(l.a)(e,[{key:"addEntity",value:function(e){this._entities.push(e)}},{key:"checkEntity",value:function(e){return this._entities.includes(e)}},{key:"getDisplayedTile",value:function(){if(this._entities.length<=0)return null;for(var e=this._entities[0],t=1;t<this._entities.length;t++)this._entities[t].priority>e.priority&&(e=this._entities[t]);return e}},{key:"isCollideable",value:function(){var e=!1;return this._entities.forEach(function(t){t.collideable&&(e=!0)}),e}},{key:"isImmoveable",value:function(){var e=!1;return this._entities.forEach(function(t){t.collideable&&!t.active&&(e=!0)}),e}},{key:"removeEntity",value:function(e){var t=this._entities.find(function(t){return t.equals(e)});t&&this._entities.splice(this._entities.indexOf(t),1)}}]),e}(),v=i(4),d=i(2),y=i(3),m=function(){function e(t){Object(c.a)(this,e),this.id=void 0,this.character=void 0,this.color=void 0,this.backgroundColor=void 0,this.priority=void 0,this.collideable=void 0,this.active=void 0,this.id=t.id,this.priority=t.priority,this.character=t.character,this.color=t.color,this.collideable=t.collideable,this.backgroundColor=t.backgroundColor?t.backgroundColor:null,this.active=t.active}return Object(l.a)(e,[{key:"equals",value:function(e){return this.id===e.id}}]),e}(),p=100,f=40,g={CHAR:"b",COLOR:"blue",PRIORITY:41},O={CHAR:".",COLOR:"#808080",PRIORITY:-1},b={ID:-1,CHAR:"@",COLOR:"#00FF00",PRIORITY:100,VISION_RADIUS:12},R={ID:-2,CHAR:"<",COLOR:"orange",PRIORITY:2},I={CHAR:"#",COLOR:"#FFFFFF",PRIORITY:0},E={CHAR:"z",COLOR:"#CC00FF",PRIORITY:40},k={ARENA:"arena",CELLULAR:"cellular",DUNGEON_DIGGER:"digger",DUNGEON_ROGUE:"rogue",DUNGEON_UNIFORM:"uniform",MAZE_DIVIDED:"divided_maze",MAZE_ELLER:"eller_maze",MAZE_ICEY:"icey_maze"},w=999999,_=function(e){function t(){Object(c.a)(this,t);var e=h.g.getUniformInt(0,w);return Object(v.a)(this,Object(d.a)(t).call(this,{id:e,priority:I.PRIORITY,character:I.CHAR,color:I.COLOR,collideable:!0,active:!1}))}return Object(y.a)(t,e),t}(m),j=function(e){function t(){Object(c.a)(this,t);var e=h.g.getUniformInt(0,w);return Object(v.a)(this,Object(d.a)(t).call(this,{id:e,priority:O.PRIORITY,character:O.CHAR,color:O.COLOR,collideable:!1,active:!1}))}return Object(y.a)(t,e),t}(m),A=function(){function e(t,i){Object(c.a)(this,e),this._map=void 0,this.display=void 0,this._map=this.create2DArrayOfTiles(t,i),this.display=new h.b({width:t,height:i,fontSize:15}),this.generateMap(k.DUNGEON_UNIFORM)}return Object(l.a)(e,[{key:"create2DArrayOfTiles",value:function(e,t){for(var i=new Array(e),n=0;n<e;n++)i[n]=new Array(t);return i}},{key:"drawMap",value:function(){for(var e=0;e<this._map.length;e++)for(var t=0;t<this._map[e].length;t++)this.drawTile(e,t)}},{key:"drawTile",value:function(e,t){var i=this._map[e][t].getDisplayedTile();i||(i=new j),this.display.draw(e,t,i.character,i.color,i.backgroundColor)}},{key:"generateMap",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k.ARENA;document.body.appendChild(this.display.getContainer());var i=null;switch(t){case k.ARENA:i=new h.e.Arena(p,f);break;case k.CELLULAR:(i=new h.e.Cellular(p,f,{born:[4,5,6,7,8],survive:[2,3,4,5,6]})).randomize(.25);break;case k.DUNGEON_DIGGER:i=new h.e.Digger(p,f,{corridorLength:[2,5],dugPercentage:.8,roomHeight:[4,8],roomWidth:[4,8]});break;case k.DUNGEON_ROGUE:i=new h.e.Rogue(p,f,{});break;case k.DUNGEON_UNIFORM:i=new h.e.Uniform(p,f,{roomDugPercentage:.5,roomHeight:[4,12],roomWidth:[4,12]});break;case k.MAZE_DIVIDED:i=new h.e.DividedMaze(p,f);break;case k.MAZE_ELLER:i=new h.e.EllerMaze(p,f);break;case k.MAZE_ICEY:i=new h.e.IceyMaze(p,f);break;default:i=new h.e.Arena(p,f)}var n=function(t,i,n){e._map[t][i]=new u(n?new _:new j)};if(i.create(n),t===k.CELLULAR){for(var a=0;a<40;a++)i.create(function(){});i.create(n.bind(this))}}},{key:"getFreeTiles",value:function(){for(var e=new Array,t=0;t<this._map.length;t++)for(var i=0;i<this._map[t].length;i++)this._map[t][i].isCollideable()||e.push(t+","+i);return e}},{key:"getFOVFromLocation",value:function(e,t){var i=this;this.display.clear();new h.d.PreciseShadowcasting(function(e,t){return e>=0&&e<p&&t>=0&&t<f&&!i._map[e][t].isImmoveable()}).compute(e,t,b.VISION_RADIUS,function(e,t,n,a){i.drawTile(e,t)})}},{key:"isSpaceCollideable",value:function(e,t){return this._map[e][t].isCollideable()}},{key:"isSpaceOccupied",value:function(e,t){return this._map[e][t].isImmoveable()}},{key:"moveEntity",value:function(e,t,i){for(var n=0;n<this._map.length;n++)for(var a=0;a<this._map[n].length;a++)this._map[n][a].checkEntity(e)&&(this._map[n][a].removeEntity(e),this.drawTile(n,a),this._map[t][i].addEntity(e))}},{key:"putActiveEntityInRandomFreeSpace",value:function(e){var t=this.getFreeTiles();if(0===t.length)return!1;var i=h.g.getUniformInt(0,t.length-1),n=t[i].split(",");t.splice(i,1);var a=parseInt(n[0]),r=parseInt(n[1]);return e.setX(a),e.setY(r),this._map[a][r].addEntity(e),!0}},{key:"putEntityInRandomFreeSpace",value:function(e){var t=this.getFreeTiles();if(0===t.length)return!1;var i=h.g.getUniformInt(0,t.length-1),n=t[i].split(",");t.splice(i,1);var a=parseInt(n[0]),r=parseInt(n[1]);return this._map[a][r].addEntity(e),!0}},{key:"removeEntity",value:function(e){for(var t=0;t<this._map.length;t++)for(var i=0;i<this._map[t].length;i++)this._map[t][i].removeEntity(e)}}]),e}(),C=i(8),T=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(v.a)(this,Object(d.a)(t).call(this,{active:!0,id:e.id,priority:e.priority,character:e.character,color:e.color,collideable:e.collideable,backgroundColor:e.backgroundColor}))).x=void 0,i.y=void 0,i.game=void 0,i.x=e.x,i.y=e.y,i.game=e.game,i}return Object(y.a)(t,e),Object(l.a)(t,[{key:"act",value:function(){this.game.engine.lock()}},{key:"moveTowardsPlayer",value:function(e){var t=this;if(this.isInPositionOfPlayer())this.removeSelf();else{var i=this.game.player.getX(),n=this.game.player.getY(),a=new h.f.AStar(i,n,function(e,i){return!t.game.map.isSpaceOccupied(e,i)},{topology:e}),r=[];a.compute(this.x,this.y,function(e,t){r.push([e,t])}),r.shift(),1==r.length?(alert("Game over - you were captured!"),this.game.engine.lock()):(i=r[0][0],n=r[0][1],this.game.map.moveEntity(this,i,n),this.x=i,this.y=n)}}},{key:"isInPositionOfPlayer",value:function(){return this.x===this.game.player.getX()&&this.y===this.game.player.getY()}},{key:"removeSelf",value:function(){this.game.removeEntity(this)}},{key:"getX",value:function(){return this.x}},{key:"getY",value:function(){return this.y}},{key:"setX",value:function(e){this.x=e}},{key:"setY",value:function(e){this.y=e}}]),t}(m),D=function(e){function t(e,i,n){var a;return Object(c.a)(this,t),(a=Object(v.a)(this,Object(d.a)(t).call(this,{x:e,y:i,game:n,id:b.ID,priority:b.PRIORITY,character:b.CHAR,color:b.COLOR,collideable:!0}))).handleEvent=function(e){var t={38:0,33:1,39:2,34:3,40:4,35:5,37:6,36:7},i=e.keyCode;if(i in t){var n=h.a[8][t[i]],r=a.x+n[0],o=a.y+n[1];a.game.map.isSpaceOccupied(r,o)||(a.game.map.moveEntity(Object(C.a)(a),r,o),a.x=r,a.y=o,window.removeEventListener("keydown",a.handleEvent),a.game.engine.unlock())}},a}return Object(y.a)(t,e),Object(l.a)(t,[{key:"act",value:function(){this.game.engine.lock(),this.game.map.getFOVFromLocation(this.x,this.y),window.document.addEventListener("keydown",this.handleEvent)}}]),t}(T),L=i(7),P=function(e){function t(e,i,n){var a;return Object(c.a)(this,t),(a=Object(v.a)(this,Object(d.a)(t).call(this,{x:e,y:i,game:n,id:h.g.getUniformInt(0,w),priority:E.PRIORITY,character:E.CHAR,color:E.COLOR,collideable:!0}))).skippingTurn=!1,a}return Object(y.a)(t,e),Object(l.a)(t,[{key:"act",value:function(){this.skippingTurn?Object(L.a)(Object(d.a)(t.prototype),"isInPositionOfPlayer",this).call(this)&&Object(L.a)(Object(d.a)(t.prototype),"removeSelf",this).call(this):Object(L.a)(Object(d.a)(t.prototype),"moveTowardsPlayer",this).call(this,4),this.skippingTurn=!this.skippingTurn}}]),t}(T),F=function(e){function t(e,i,n){var a;return Object(c.a)(this,t),(a=Object(v.a)(this,Object(d.a)(t).call(this,{x:e,y:i,game:n,id:h.g.getUniformInt(0,w),priority:g.PRIORITY,character:g.CHAR,color:g.COLOR,collideable:!0}))).movingRandomlyTurn=!1,a}return Object(y.a)(t,e),Object(l.a)(t,[{key:"act",value:function(){this.movingRandomlyTurn?this.moveARandomDirection():this.moveTowardsPlayer(8),this.movingRandomlyTurn=!this.movingRandomlyTurn}},{key:"moveARandomDirection",value:function(){if(Object(L.a)(Object(d.a)(t.prototype),"isInPositionOfPlayer",this).call(this))Object(L.a)(Object(d.a)(t.prototype),"removeSelf",this).call(this);else{for(var e=new Array,i=-1;i<=1;i++)for(var n=-1;n<=1;n++)this.game.map.isSpaceCollideable(this.x+i,this.y+n)||e.push([this.x+i,this.y+n]);if(e.length>0){var a=e[h.g.getUniformInt(0,e.length-1)];this.game.map.moveEntity(this,a[0],a[1]),this.x=a[0],this.y=a[1]}}}}]),t}(T),U=function(e){function t(){return Object(c.a)(this,t),Object(v.a)(this,Object(d.a)(t).call(this,{id:R.ID,priority:R.PRIORITY,character:R.CHAR,color:R.COLOR,collideable:!1,active:!1}))}return Object(y.a)(t,e),t}(m),N=function(){function e(){Object(c.a)(this,e),this.engine=void 0,this.entities=void 0,this.player=void 0,this.map=void 0,this.scheduler=new h.h.Simple,this.stairs=void 0,this.map=new A(p,f),this.entities=new Array,this.player=new D(-1,-1,this),this.generatePlayer(this.player),this.generateActiveEntity(P),this.generateActiveEntity(F),this.stairs=this.generateEntity(U),this.engine=new h.c(this.scheduler),this.engine.start()}return Object(l.a)(e,[{key:"generateActiveEntity",value:function(e){var t=new e(-1,-1,this);this.map.putActiveEntityInRandomFreeSpace(t)&&(this.entities.push(t),this.scheduler.add(t,!0))}},{key:"generateEntity",value:function(e){var t=new e;if(this.map.putEntityInRandomFreeSpace(t))return t}},{key:"generatePlayer",value:function(e){this.map.putActiveEntityInRandomFreeSpace(e)&&(this.player=e,this.scheduler.add(e,!0))}},{key:"removeEntity",value:function(e){this.map.removeEntity(e),this.scheduler.remove(e);var t=this.entities.indexOf(e);this.entities.splice(t,1)}}]),e}();Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));new N;o.a.render(a.a.createElement(s,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.6e71e5cd.chunk.js.map