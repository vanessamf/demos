/*! lozad.js - v1.7.0 - 2018-11-08
 * https://github.com/ApoorvSaxena/lozad.js
 * Copyright (c) 2018 Apoorv Saxena; Licensed MIT */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.lozad = e()
}(this, function() {
	"use strict";
	var g = Object.assign || function(t) {
			for(var e = 1; e < arguments.length; e++) {
				var r = arguments[e];
				for(var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
			}
			return t
		},
		r = "undefined" != typeof document && document.documentMode,
		l = {
			rootMargin: "0px",
			threshold: 0,
			load: function(t) {
				if("picture" === t.nodeName.toLowerCase()) {
					var e = document.createElement("img");
					r && t.getAttribute("data-iesrc") && (e.src = t.getAttribute("data-iesrc")), t.getAttribute("data-alt") && (e.alt = t.getAttribute("data-alt")), t.appendChild(e)
				}
				t.getAttribute("data-src") && (t.src = t.getAttribute("data-src")), t.getAttribute("data-srcset") && t.setAttribute("srcset", t.getAttribute("data-srcset")), t.getAttribute("data-background-image") && (t.style.backgroundImage = "url('" + t.getAttribute("data-background-image") + "')"), t.getAttribute("data-toggle-class") && t.classList.toggle(t.getAttribute("data-toggle-class"))
			},
			loaded: function() {}
		};
	/**
	 * Detect IE browser
	 * @const {boolean}
	 * @private
	 */
	function f(t) {
		t.setAttribute("data-loaded", !0)
	}
	var b = function(t) {
		return "true" === t.getAttribute("data-loaded")
	};
	return function() {
		var r, o, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ".lozad",
			t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
			e = g({}, l, t),
			n = e.root,
			i = e.rootMargin,
			d = e.threshold,
			u = e.load,
			c = e.loaded,
			s = void 0;
		return window.IntersectionObserver && (s = new IntersectionObserver((r = u, o = c, function(t, e) {
			t.forEach(function(t) {
				(0 < t.intersectionRatio || t.isIntersecting) && (e.unobserve(t.target), b(t.target) || (r(t.target), f(t.target), o(t.target)))
			})
		}), {
			root: n,
			rootMargin: i,
			threshold: d
		})), {
			observe: function() {
				for(var t = function(t) {
						var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document;
						return t instanceof Element ? [t] : t instanceof NodeList ? t : e.querySelectorAll(t)
					}(a, n), e = 0; e < t.length; e++) b(t[e]) || (s ? s.observe(t[e]) : (u(t[e]), f(t[e]), c(t[e])))
			},
			triggerLoad: function(t) {
				b(t) || (u(t), f(t), c(t))
			},
			observer: s
		}
	}
});