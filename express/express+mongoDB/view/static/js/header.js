$(document).ready(() => {
  // 로그인 X
  const noHeader = ` 
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/view" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img style='width: 50%' src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/cdfa4/elice_logo.webp">
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/view/index.html" class="nav-link px-2 link-dark">Home</a></li>
        <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2" onclick="location.href='/view/user/login.html'">Login</button>
        <button type="button" class="btn btn-primary" onclick="location.href='/view/user/signUp.html'">Sign-up</button>
      </div>
    </header>`;

  // 로그인 O
  const yesHeader = ` 
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/view" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img style='width: 50%' src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/cdfa4/elice_logo.webp">
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/view/index.html" class="nav-link px-2 link-dark">Home</a></li>
        <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-danger me-2" onclick="logOut()">LogOut</button>
      </div>
    </header>`;

    // Cookie 가져오기 
    let status = $.cookie('accessToken');

    if (status) {
      $(".container").prepend(yesHeader);
    } else {
      $(".container").prepend(noHeader);
    }
});

// logOut 버큰 클릭시
const logOut = () => {
  
  // 쿠키 삭제 
  $.removeCookie('accessToken', { path: '/' });
  
  // redirect
  location.href = '/view/user/login.html';
}