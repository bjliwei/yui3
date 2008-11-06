YUI.add("node",function(D){var B="ownerDocument",K="tagName",G="nodeName",M="nodeType";var A=D.Selector,P={},F={},J={},C={},O=[].slice;var N=function(R){var Q=null;if(R){Q=(typeof R==="string")?function(S){return D.Selector.test(S,R);}:function(S){return R(D.get(S));};}return Q;};var L=function(Q){var R=D.config.doc;if(Q){if(Q[M]){if(Q[M]===9){R=Q;}else{R=Q[B];}}else{if(I[Q._yuid]){R=I[Q._yuid]()[0];}}}return R;};var H=function(Q){if(Q&&!Q[M]&&Q._yuid){Q=I[Q._yuid]()[0];}return Q||null;};var I=function(Q,R){this.init(Q,R);this.initPlugins();this.refresh();};I.plugins={};I._deepGet=function(S,T){var R=S.length,Q;if(R>0){for(Q=0;T!==undefined&&Q<R;++Q){T=T[S[Q]];}}return T;};I._deepSet=function(T,V,S){var R=T.length-1,Q,U;if(R>=0){U=V;for(Q=0;U!==undefined&&Q<R;++Q){U=U[T[Q]];}if(U!==undefined&&U[T[Q]]!==undefined){U[T[Q]]=S;}}};I.scrubVal=function(T,R,S){if(T!==undefined){if(typeof T==="object"||typeof T==="function"){if(T!==null&&(M in T||T.item||(T[0]&&T[0][M])||T.document)){if(R&&C&&C[R._yuid]&&!R.contains(T)){T=null;}else{T=I.get(T);}}else{S=S===undefined?4:S;if(S>0){for(var Q in T){if(T.hasOwnProperty(Q)){T[Q]=I.scrubVal(T[Q],R,--S);}}}}}}else{T=R;}return T;};I.setters={};I.getters={"text":function(Q){return D.DOM.getText(Q);},"options":function(Q){return(Q)?Q.getElementsByTagName("option"):[];},"children":function(T){var S=T.children;if(S===undefined){var U=T.childNodes;S=[];for(var R=0,Q=U.length;R<Q;++R){if(U[R][K]){S[S.length]=U[R];}}}return S;}};I.methods=function(Q,R){if(typeof Q=="string"){I.prototype[Q]=function(){var V=true,U=O.call(arguments,0),S=this,T;U.unshift("");I[S._yuid](function(W){U[0]=W;var X=R.apply(S,U);if(V){T=X;V=false;}});T=I.scrubVal(T,this);return T;};}else{D.each(Q,function(T,S){I.methods(S,T);});}};I.getDOMNode=function(R){var Q;if(R[M]){Q=R;}else{if(typeof R==="string"){Q=A.query(R,null,true);}else{Q=I[R._yuid]()[0];}}return Q||null;};I.wrapDOMMethod=function(Q){return function(){return D.DOM[Q].apply(D.DOM,arguments);};};I.addDOMMethods=function(Q){var R={};D.each(Q,function(S,T){R[S]=D.Node.wrapDOMMethod(S);});D.Node.methods(R);};I.prototype={init:function(R,V){var Q=typeof R==="string"?R:null,T=D.stamp(this);V=L(V);this.getId=function(){return T;};var U=function(X,W){if(X){W=W||0;for(var Y;Y=R[W++];){X(Y);}}return R;};var S=function(W){if(W){W(R[0]);}return R;};this.refresh=function(){if(Q){if(Q==="document"){R=[D.config.doc];}else{R=A.query(Q,V);}}if(R[M]||R.document){R=[R];I[T]=S;}else{I[T]=U;}};},initPlugins:function(){D.each(I.plugins,function(Q,R){this.plug(R,Q);});},filter:function(Q){return I.scrubVal(A.filter(I[this._yuid](),Q),this);},each:function(R,Q){Q=Q||this;I[this._yuid](function(S){R.call(Q,I.get(S));});},size:function(){return I[this._yuid]().length;},item:function(Q){var R=I[this._yuid]()[Q];return I.get(R);},attach:function(T,S,Q){var R=O.call(arguments,0);R.splice(2,0,I[this._yuid]());return D.Event.attach.apply(D.Event,R);},on:function(S,R,Q){return this.attach.apply(this,arguments);},addEventListener:function(S,R,Q){return D.Event.nativeAdd(I[this._yuid](),S,R,Q);},detach:function(S,R){var Q=O.call(arguments,0);Q.splice(2,0,I[this._yuid]());return D.Event.detach.apply(D.Event,Q);},removeEventListener:function(R,Q){return D.Event.nativeRemove(I[this._yuid](),R,Q);},create:function(Q){return D.Node.create(Q);},plug:function(R,Q){Q=Q||{};Q.owner=this;if(R&&R.NS){this[R.NS]=new R(Q);}return this;},toString:function(){var R="",Q=I[this._yuid]()[0]||{};if(Q){R+=Q[G];if(Q.id){R+="#"+Q.id;}if(Q.className){R+="."+Q.className.replace(" ",".");}}else{"no nodes for "+this._yuid;}return R;}};I.methods({set:function(Q,S,R){if(S.indexOf(".")<0){if(S in I.setters){I.setters[S](this,S,R);}else{if(Q[S]!==undefined){Q[S]=R;}else{}}}else{I._deepSet(S.split("."),Q,R);}},get:function(Q,S){var R;if(S.indexOf(".")<0){if(S in I.getters){R=I.getters[S].call(this,Q,S);}else{R=Q[S];}if(R===undefined){R=null;}}else{R=I._deepGet(S.split("."),Q);}return R;},invoke:function(T,X,R,Q,W,V,U){var S;if(R){R=(R[M])?R:H(R);if(Q){Q=(Q[M])?Q:H(Q);}}S=T[X](R,Q,W,V,U);return S;},hasMethod:function(Q,R){return !!Q[R];},query:function(S,Q){var R=A.query(Q,S);if(!R.length){R=null;}return R;},queryAll:function(S,Q){var R=A.query(Q,S);if(!R.length){R=null;}return R;},test:function(R,Q){return A.test(R,Q);},compareTo:function(R,Q){Q=H(Q)||R;return R===Q;},ancestor:function(R,Q){return D.DOM.elementByAxis(R,"parentNode",N(Q));},previous:function(S,R,Q){return D.DOM.elementByAxis(S,"previousSibling",N(R),Q);},next:function(S,R,Q){return D.DOM.elementByAxis(S,"nextSibling",N(R),Q);},contains:function(Q,R){return D.DOM.contains(Q,H(R));},inDoc:function(Q,R){R=(R)?L(R):Q.ownerDocument;if(R.documentElement){return D.DOM.contains(R.documentElement,Q);}},byId:function(R,S){var Q=R[B].getElementById(S);if(!Q||!D.DOM.contains(R,Q)){Q=null;}return Q;}});I.create=function(Q){return I.get(D.DOM.create(Q));};I.getById=function(R,Q){Q=(Q&&Q[M])?Q:D.config.doc;return I.get(Q.getElementById(R));};I.get=function(S,T,R){var Q;if(S){if(S instanceof I){Q=S;}else{Q=new I(S,T);}if(R){C[Q._yuid]=Q;}}return(Q&&Q.size())?Q:null;};I.all=function(){I.get.apply(I,arguments);};D.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","getAttribute","setAttribute","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur:","submit","reset","select"],function(Q){I.prototype[Q]=function(U,S,R){var T=this.invoke(Q,U,S,R);return T;};});if(!document.documentElement.hasAttribute){I.methods({"hasAttribute":function(R,Q){return !!R.getAttribute(Q);}});}var E=I.create("<div></div>");D.Node=I;D.all=D.Node.all;D.get=D.Node.get;D.Node.addDOMMethods(["getStyle","getComputedStyle","setStyle","setStyles"]);D.Node.addDOMMethods(["hasClass","addClass","removeClass","replaceClass","toggleClass"]);D.each(["region","viewportRegion"],function(Q,R){D.Node.getters[Q]=D.Node.wrapDOMMethod(Q);});D.Node.addDOMMethods(["inViewportRegion"]);D.Node.methods({intersect:function(R,Q,S){if(Q instanceof D.Node){Q=D.Node.getDOMNode(Q);
}return D.DOM.intersect(R,Q,S);},inRegion:function(R,Q,S,T){if(Q instanceof D.Node){Q=D.Node.getDOMNode(Q);}return D.DOM.inRegion(R,Q,S,T);}});D.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(Q,R){D.Node.getters[Q]=D.Node.wrapDOMMethod(Q);});D.Node.addDOMMethods(["getXY","setXY","getX","setX","getY","setY"]);},"@VERSION@",{requires:["dom"]});