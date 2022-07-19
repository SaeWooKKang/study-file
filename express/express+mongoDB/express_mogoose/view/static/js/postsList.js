$(document).ready(() => {
  
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
            <button type="button" class="btn btn-danger">Delete</button>
            <button type="button" class="btn btn-warning">Update</button>
          </td>
        </tr>`;

        // append 맨 뒤 추가
        $('.postsList').append(listData);
      });
    }
  });

});