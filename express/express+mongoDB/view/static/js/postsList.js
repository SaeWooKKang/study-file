const getList = () => {

  $('.postsList').empty(); // .postList 클래스 내부에 있는 html들 삭제 

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts',
    success: (res) => {
      res.map((post, index) => {
        
        let listData = ` 
        <tr>
          <th scope="row">${ index + 1 }</th>
          <td>${ post.title }</td>
          <td>elice</td>
          <td>
            <button type="button" class="btn btn-danger" onclick="deletePost('${ post.shortId }')">Delete</button>
            <button type="button" class="btn btn-warning" onclick="updatePost('${ post.shortId }')">Update</button>
          </td>
        </tr>`;

        // append 맨 뒤 추가
        $('.postsList').append(listData);
      });
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