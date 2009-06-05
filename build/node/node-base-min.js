YUI.add("node-base",function(E){var Q={},I={},L=Array.prototype.slice,K=".",G="nodeName",O="nodeType",B="ownerDocument",M="tagName",D="_yuid",H=E.Base,C=E.Base.prototype,J=function(T,R){var S=null;this[D]=E.stamp(T);Q[this[D]]=T;J._instances[this[D]]=this;if(R){S={restricted:R};I[this[D]]=true;}this._lazyAttrInit=true;this._silentInit=true;H.call(this,S);},P=function(S){var R=null;if(S){R=(typeof S==="string")?function(T){return E.Selector.test(T,S);}:function(T){return S(J.get(T));};}return R;};J.NAME="Node";J.DOM_EVENTS={abort:true,blur:true,change:true,click:true,close:true,command:true,contextmenu:true,dblclick:true,error:true,focus:true,keydown:true,keypress:true,keyup:true,load:true,mousedown:true,mousemove:true,mouseout:true,mouseover:true,mouseup:true,mousemultiwheel:true,mousewheel:true,submit:true,mouseenter:true,mouseleave:true,scroll:true,reset:true,resize:true,select:true,textInput:true,unload:true};E.mix(J.DOM_EVENTS,E.Env.evt.plugins);J.EXEC_SCRIPTS=true;J._instances={};J.plug=function(){var R=L.call(arguments,0);R.unshift(J);E.Base.plug.apply(E.Base,R);return J;};J.unplug=function(){var R=L.call(arguments,0);R.unshift(J);E.Base.unplug.apply(E.Base,R);return J;};J.getDOMNode=function(R){if(R){if(R instanceof J){R=Q[R[D]];}else{if(!R[G]||E.DOM.isWindow(R)){R=null;}}}return R||null;};J.scrubVal=function(V,T,U){var R=false;if(T&&V){if(typeof V==="object"||typeof V==="function"){if(O in V||E.DOM.isWindow(V)){if(I[T[D]]&&!T.contains(V)){V=null;}else{V=J.get(V);}}else{if(V.item||(V[0]&&V[0][O])){V=E.all(V);}else{U=(U===undefined)?4:U;if(U>0){for(var S in V){if(V.hasOwnProperty&&V.hasOwnProperty(S)){V[S]=J.scrubVal(V[S],T,--U);}}}}}}}else{if(V===undefined){V=T;}}return V;};J.addMethod=function(R,T,S){if(R&&T&&typeof T==="function"){J.prototype[R]=function(){S=S||this;var V=L.call(arguments),U;if(V[0]&&V[0] instanceof J){V[0]=J.getDOMNode(V[0]);}if(V[1]&&V[1] instanceof J){V[1]=J.getDOMNode(V[1]);}V.unshift(Q[this[D]]);U=J.scrubVal(T.apply(S,V),this);return U;};}else{}};J.importMethod=function(T,R,S){if(typeof R==="string"){S=S||R;J.addMethod(S,T[R],T);}else{E.each(R,function(U){J.importMethod(T,U);});}};J.get=function(T,U,S){var R=null;if(typeof T==="string"){if(T.indexOf("doc")===0){T=E.config.doc;}else{if(T.indexOf("win")===0){T=E.config.win;}else{T=E.Selector.query(T,U,true);}}}if(T){R=J._instances[T[D]];if(!R){R=new J(T,S);}else{if(S){I[R[D]]=true;R._set("restricted",true);}}}return R;};J.create=function(){return J.get(E.DOM.create.apply(E.DOM,arguments));};J.ATTRS={text:{getter:function(){return E.DOM.getText(Q[this[D]]);},readOnly:true},"options":{getter:function(){return this.getElementsByTagName("option");}},"children":{getter:function(){var U=Q[this[D]],T=U.children,V,S,R;if(T===undefined){V=U.childNodes;T=[];for(S=0,R=V.length;S<R;++S){if(V[S][M]){T[T.length]=V[S];}}}return E.all(T);}},value:{getter:function(){return E.DOM.getValue(Q[this[D]]);},setter:function(R){return E.DOM.setValue(Q[this[D]],R);}},restricted:{writeOnce:true,value:false}};J.DEFAULT_SETTER=function(R,T){var S=Q[this[D]],U;if(R.indexOf(K)>-1){U=R;R=R.split(K);E.Object.setValue(S,R,T);}else{if(S[R]!==undefined){S[R]=T;}}return this;};J.DEFAULT_GETTER=function(R){var S=Q[this[D]],T;if(R.indexOf&&R.indexOf(K)>-1){T=E.Object.getValue(S,R.split(K));}else{T=S[R];}return T?E.Node.scrubVal(T,this):T;};E.extend(J,E.Base);E.mix(J.prototype,{toString:function(){var T="",S=this[D]+": not bound to a node",R=Q[this[D]];if(R){T+=R[G];if(R.id){T+="#"+R.id;}if(R.className){T+="."+R.className.replace(" ",".");}T+=" "+this[D];}return T||S;},_addDOMAttr:function(R){var S=Q[this[D]];if(S&&S[R]!==undefined){this.addAttr(R,{getter:function(){return J.DEFAULT_GETTER.call(this,R);},setter:function(T){return J.DEFAULT_SETTER.call(this,R,T);}});}else{}},get:function(R){if(!this.attrAdded(R)){if(J.re_aria&&J.re_aria.test(R)){this._addAriaAttr(R);}else{return J.DEFAULT_GETTER.apply(this,arguments);}}return C.get.apply(this,arguments);},set:function(R,S){if(!this.attrAdded(R)){if(J.re_aria&&J.re_aria.test(R)){this._addAriaAttr(R);}else{if(R.indexOf(K)<0&&this._yuievt.events["Node:"+R+"Change"]){this._addDOMAttr(R);}else{J.DEFAULT_SETTER.call(this,R,S);return this;}}}C.set.apply(this,arguments);return this;},create:J.create,compareTo:function(R){var S=Q[this[D]];if(R instanceof E.Node){R=E.Node.getDOMNode(R);}return S===R;},inDoc:function(S){var R=Q[this[D]];S=(S)?J.getDOMNode(S):R[B];if(S.documentElement){return E.DOM.contains(S.documentElement,R);}},getById:function(T){var S=Q[this[D]],R=E.DOM.byId(T,S[B]);if(R&&E.DOM.contains(S,R)){R=E.get(R);}else{R=null;}return R;},ancestor:function(R){return J.get(E.DOM.elementByAxis(Q[this[D]],"parentNode",P(R)));},previous:function(S,R){return J.get(E.DOM.elementByAxis(Q[this[D]],"previousSibling",P(S),R));},next:function(T,S,R){return J.get(E.DOM.elementByAxis(Q[this[D]],"nextSibling",P(S),R));},query:function(R){return E.get(E.Selector.query(R,Q[this[D]],true));},queryAll:function(R){return E.all(E.Selector.query(R,Q[this[D]]));},test:function(R){return E.Selector.test(Q[this[D]],R);},remove:function(){var R=Q[this[D]];R.parentNode.removeChild(R);return this;},invoke:function(Y,S,R,X,W,V){var U=Q[this[D]],T;if(S&&S instanceof E.Node){S=J.getDOMNode(S);}if(R&&R instanceof E.Node){R=J.getDOMNode(R);}T=U[Y](S,R,X,W,V);return E.Node.scrubVal(T,this);},destructor:function(){},each:function(S,R){R=R||this;return S.call(R,this);},item:function(R){return this;},size:function(){return Q[this[D]]?1:0;},insert:function(S,R,T){if(S){T=(T&&J.EXEC_SCRIPTS);if(typeof R==="number"){R=Q[this[D]].childNodes[R];}if(typeof S!=="string"){S=E.Node.getDOMNode(S);}if(!R||(!I[this[D]]||this.contains(R))){E.DOM.addHTML(Q[this[D]],S,R,T);}}return this;},prepend:function(R,S){return this.insert(R,0,S);},append:function(R,S){return this.insert(R,null,S);},setContent:function(R,S){S=(S&&J.EXEC_SCRIPTS);E.DOM.addHTML(Q[this[D]],R,"replace",S);return this;},hasMethod:function(S){var R=Q[this[D]];return(R&&(typeof R==="function"));
}},true);E.Node=J;E.get=E.Node.get;E.Array._diff=function(S,R){var W=[],Y=false,U,T,X,V;outer:for(U=0,X=S.length;U<X;U++){Y=false;for(T=0,V=R.length;T<V;T++){if(S[U]===R[T]){Y=true;continue outer;}}if(!Y){W[W.length]=S[U];}}return W;};E.Array.diff=function(S,R){return{added:E.Array._diff(R,S),removed:E.Array._diff(S,R)};};var N={},L=Array.prototype.slice,D="_yuid",A=function(S){var T=S.doc||E.config.doc,R=S.nodes||[];if(typeof R==="string"){this._query=R;R=E.Selector.query(R,T);}E.stamp(this);A._instances[this[D]]=this;N[this[D]]=R;if(S.restricted){I=this[D];}};A.NAME="NodeList";A.getDOMNodes=function(R){return N[R[D]];};A._instances=[];A.each=function(R,U,T){var S=N[R[D]];if(S&&S.length){E.Array.each(S,U,T||R);}else{}};A.addMethod=function(R,U,T){var S=A._getTempNode();if(R&&U){A.prototype[R]=function(){var W=[],V=arguments;E.Array.each(N[this[D]],function(b){var a="_yuid",Y=E.Node._instances[b[a]],Z,X;if(!Y){Q[S[a]]=b;Y=S;}Z=T||Y;X=U.apply(Z,V);if(X!==undefined&&X!==Y){W[W.length]=X;}});return W.length?W:this;};}else{}};A.importMethod=function(T,R,S){if(typeof R==="string"){S=S||R;A.addMethod(R,T[R]);}else{E.each(R,function(U){A.importMethod(T,U);});}};A._getTempNode=function(){var R=A._tempNode;if(!R){R=E.Node.create("<div></div>");A._tempNode=R;}return R;};E.mix(A.prototype,{item:function(R){return E.get((N[this[D]]||[])[R]);},each:function(T,S){var R=this;E.Array.each(N[this[D]],function(V,U){V=E.get(V);return T.call(S||V,V,U,R);});return R;},batch:function(S,R){var T=this;tmp=A._getTempNode();E.Array.each(N[this[D]],function(W,V){var U=E.Node._instances[W[D]];if(!U){Q[tmp[D]]=W;U=tmp;}return S.call(R||U,U,V,T);});return T;},some:function(T,S){var R=this;return E.Array.some(N[this[D]],function(V,U){V=E.get(V);S=S||V;return T.call(S,V,U,R);});},indexOf:function(R){return E.Array.indexOf(N[this[D]],E.Node.getDOMNode(R));},filter:function(R){return E.all(E.Selector.filter(N[this[D]],R));},modulus:function(T,S){S=S||0;var R=[];A.each(this,function(V,U){if(U%T===S){R.push(V);}});return E.all(R);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){delete A._instances[this[D]];},refresh:function(){var S,R,T=N[this[D]];if(this._query){if(N[this[D]]&&N[this[D]][0]&&N[this[D]][0].ownerDocument){S=N[this[D]][0].ownerDocument;}N[this[D]]=E.Selector.query(this._query,S||E.config.doc);R=E.Array.diff(T,N[this[D]]);R.added=R.added?E.all(R.added):null;R.removed=R.removed?E.all(R.removed):null;this.fire("refresh",R);}return this;},size:function(){return N[this[D]].length;},get:function(S){var R=[],T=A._getTempNode();A.each(this,function(V){var U=E.Node._instances[V[D]];if(!U){Q[T[D]]=V;U=T;}R[R.length]=U.get(S);});return R;},toString:function(){var U="",T=this[D]+": not bound to any nodes",R=N[this[D]],S;if(R&&R[0]){S=R[0];U+=S[G];if(S.id){U+="#"+S.id;}if(S.className){U+="."+S.className.replace(" ",".");}if(R.length>1){U+="...["+R.length+" items]";}}return U||T;}},true);A.importMethod(E.Node.prototype,["after","append","create","detach","detachAll","insert","on","plug","prepend","remove","set","setContent","unplug"]);E.NodeList=A;E.all=function(S,U,R){var T=new A({nodes:S,doc:U,restricted:R});return T;};E.Node.all=E.all;var D="_yuid";E.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select"],function(R){E.Node.prototype[R]=function(V,T,S){var U=this.invoke(R,V,T,S);return U;};});J.importMethod(E.DOM,["contains","setAttribute","getAttribute"]);if(!document.documentElement.hasAttribute){E.Node.prototype.hasAttribute=function(R){return E.DOM.getAttribute(E.Node.getDOMNode(this),R)!=="";};}E.NodeList.importMethod(E.Node.prototype,["getAttribute","setAttribute"]);(function(){var R=document.createElement("div");E.stamp(R);if(R[D]===R.cloneNode(true)[D]){E.Node.prototype.cloneNode=function(S){var T=E.Node.getDOMNode(this).cloneNode(S);T[D]=E.guid();return E.get(T);};}})();var F=["hasClass","addClass","removeClass","replaceClass","toggleClass"];E.Node.importMethod(E.DOM,F);E.NodeList.importMethod(E.Node.prototype,F);},"@VERSION@",{requires:["dom-base","base","selector"]});