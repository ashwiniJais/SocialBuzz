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
                   deletePost($(' .delete-post-button', newPost));

                   new Noty({
                    theme: 'relax',
                    text: "Post published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDOM=function(post){
        return $(` <li id="post-${post._id}">
                   
                        <a class="delete-post-button" href="posts/delete/${post._id}">X</a>
                
                        <p>${post.content}</p>
                
                        <small>${post.user.name}</small>
                    
                    
                        <div class="post-comment">

                            <form action="/comments/create" method="post">
                                <input type="text" name="content" required placeholder="Add a comment" >
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Add a comment">
                            </form>
                
                        
                            <div class="post-comment-list">
                                <ul id="post-comments-${post._id}">
                            
                                </ul>
                            </div>
                        </div>
                   
                    </li>
                `)
    }
    
    //method to delete a post from DOM

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("default precented");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    createPost();
}



