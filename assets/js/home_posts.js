{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new_post_form');

        newPostForm.submit(function(e){
            console.log("default prevented");
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   let newPost = newPostDOM(data.data.post);
                   $('#post-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDOM=function(post){
        return $(` <li id="post-${post._id}">
                   
                        <a class="delete-post-button" href="posts/delete/${post.id}">X</a>
                
                    <p>${post.content}</p>
                
                    <small>${post.user.name}</small>
                    </li>
                    
                    <div class="comments_form">

                   

                        <form action="/comments/create" method="post">
                            <input type="text" name="content" required placeholder="Add a comment" >
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add a comment">
                        </form>

                   
                    </div>
                        <ul>
                            <div class="comments_container">
                                
                            
                            </div>
                        </ul>
                `)
    }
    

    createPost();
}



