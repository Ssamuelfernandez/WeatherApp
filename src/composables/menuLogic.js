export default function useMenuLogic() {
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menuBtn");
  var closeBtn = document.getElementById("closeBtn");

  menuBtn.onclick = function () {

    menu.style.width = "100%";
    menuBtn.style.display = "none";

    menu.classList.add('animate__animated', 'animate__fadeInLeft');
    menu.addEventListener('animationend', function () {
      menu.classList.remove('animate__animated', 'animate__fadeInLeft');
    });

  }

  closeBtn.onclick = function () {
    menu.style.width = "0";

    menu.classList.add('animate__animated', 'animate__fadeOutLeft');
    menu.addEventListener('animationend', function () {
      menu.classList.remove('animate__animated', 'animate__fadeOutLeft');
    });

    setTimeout(function () {
      menuBtn.style.display = "block";
      menuBtn.classList.add('animate__animated', 'animate__fadeIn');
    }, 600);
  }

  window.onresize = function () {
    if (window.innerWidth > 900) {
      menu.style.width = "100%";
      menuBtn.style.display = "none";
    } else {
      menu.style.width = "0";
      menuBtn.style.display = "block";
    }
  }
}

