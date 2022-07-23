const getList = () => {

  $('.postsList').empty(); // .postList 클래스 내부에 있는 html들 삭제 

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts',
    headers: {
      accessToken: $.cookie('accessToken')
    },
    success: (res) => {
      res.map((post, index) => {
        let listData;
      
        if (sessionStorage.getItem('email') == post.author.email) { // 만약 자기 게시글이면 버튼 보이고
          listData = ` 
          <tr>
            <th scope="row">${ index + 1 }</th>
            <td>${ post.title }</td>
            <td>${ post.author.name }</td>
            <td>
              <button type="button" class="btn btn-danger" onclick="deletePost('${ post.shortId }')">Delete</button>
              <button type="button" class="btn btn-warning" onclick="updatePost('${ post.shortId }')">Update</button>
            </td>
          </tr>`;
        } else { // 남의 게시글은 버튼 안보이고 
          listData = ` 
          <tr>
            <th scope="row">${ index + 1 }</th>
            <td>${ post.title }</td>
            <td>${ post.author.name }</td>
            <td></td>
          </tr>`;
        }

        // append 맨 뒤 추가
        $('.postsList').append(listData);
      });
    },
    error: err => {
      alert(err.responseJSON.message);
      location.href = '/view/user/login.html';
    }
  });
}

$(document).ready(() => {
  getList();

});

const deletePost = shortId => {
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/posts/${ shortId }/delete`,
    headers: {
      accessToken: $.cookie('accessToken')
    },
    success: res => {
      alert(res.result);
      getList();
    }
  });
};

const updatePost = shortId => {
  window.localStorage.setItem("shortId", shortId);
  location.href='./updateEdit.html';
}