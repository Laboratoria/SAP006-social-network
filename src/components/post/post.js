export const printPost = (post) => {
    const areaOfPost = document.createElement('div');
    console.log(areaOfPost);
    areaOfPost.innerHTML = `
        <section data-container>
          <div class="box">
            <p class="username">username</p>
            <div class="content">
              <button>
                <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle"
                  style="color: #706F6B;"></span>
              </button>
              <div class="textBox">
                <p class="post-content text-post" id='${post.id}'>${post.text}</p>
                <div class="btn-inside">
                  <button class="btn-actions"><span class="iconify" data-inline="false"
                      data-icon='ri:image-add-fill'></span>
                  </button>
                  <button class="btn-actions"><span class="iconify" data-inline="false"
                      data-icon="mdi:send-circle"></span>
                  </button>
                </div>
              </div>
            </div>
  
            <section class="actions">
              <button class="delete-button" value="${post.id}"><span class="iconify" data-inline="false"
                  data-icon="bytesize:trash" style="color: #706f6b;"></span></button>
              <button><span id="btn-reply" class="iconify" data-inline="false" data-flip="vertical"
                  data-icon="bi:reply"></span></button>
              <button>❤️ ${post.likes}</button>
            </section>
          </div>
        </section>
  `;
    document.getElementById('postTemplate').innerHTML += areaOfPost; // Esse areaOfPost está entrando como objeto ao invés de string
  };

  