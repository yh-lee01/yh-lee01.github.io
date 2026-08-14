/**
 * lang-toggle.js
 * Kor/Eng 언어 전환 토글 로직
 *
 * 동작:
 *   - localStorage에 'siteLanguage' 키로 'en' 또는 'ko' 저장
 *   - 페이지 로드 시 저장된 언어를 적용 (기본값: 'en')
 *   - .lang-en / .lang-ko 요소를 show/hide
 *   - <html lang=""> 속성도 함께 업데이트
 */

(function () {
  "use strict";

  var STORAGE_KEY = "siteLanguage";
  var DEFAULT_LANG = "en";

  /** 저장된 언어를 반환 (없으면 기본값) */
  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  /** 언어를 저장 */
  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage 사용 불가 시 무시
    }
  }

  /** 언어 적용: DOM 토글 + 버튼 상태 업데이트 */
  function applyLang(lang) {
    // <html lang=""> 업데이트
    document.documentElement.setAttribute("lang", lang === "ko" ? "ko" : "en");

    // body에 data-lang 속성 설정 (CSS에서 활용)
    document.body.setAttribute("data-lang", lang);

    // .lang-en / .lang-ko 요소 show/hide
    var enElements = document.querySelectorAll(".lang-en");
    var koElements = document.querySelectorAll(".lang-ko");

    for (var i = 0; i < enElements.length; i++) {
      enElements[i].style.display = lang === "en" ? "" : "none";
    }
    for (var i = 0; i < koElements.length; i++) {
      koElements[i].style.display = lang === "ko" ? "" : "none";
    }

    // 토글 버튼 active 상태 업데이트
    var btnEn = document.getElementById("lang-btn-en");
    var btnKo = document.getElementById("lang-btn-ko");
    if (btnEn && btnKo) {
      if (lang === "en") {
        btnEn.classList.add("active");
        btnKo.classList.remove("active");
      } else {
        btnKo.classList.add("active");
        btnEn.classList.remove("active");
      }
    }
  }

  /** 초기화 */
  function init() {
    var lang = getSavedLang();
    applyLang(lang);

    // 버튼 클릭 이벤트 연결
    var btnEn = document.getElementById("lang-btn-en");
    var btnKo = document.getElementById("lang-btn-ko");

    if (btnEn) {
      btnEn.addEventListener("click", function () {
        saveLang("en");
        applyLang("en");
      });
    }
    if (btnKo) {
      btnKo.addEventListener("click", function () {
        saveLang("ko");
        applyLang("ko");
      });
    }
  }

  // DOM 준비 후 즉시 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
