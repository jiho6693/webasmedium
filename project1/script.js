
    function updateFilterScale() {
      var scaleValue = getComputedStyle(document.documentElement)
                       .getPropertyValue('--displacement-scale').trim();
      var filter = document.querySelector('#distort feDisplacementMap');
      filter.setAttribute('scale', scaleValue);
    }
  
    // 페이지 로드 시 필터 업데이트
    document.addEventListener('DOMContentLoaded', updateFilterScale);
  
    // 창 크기가 변경될 때 필터 업데이트
    window.addEventListener('resize', updateFilterScale);