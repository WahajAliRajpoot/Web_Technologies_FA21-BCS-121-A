 // Function to fetch and display stories
function displayStories() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    dataType: "json",
    success: function (data) {
      var List = $("#DataList");
      List.empty();

      $.each(data, function (index, story) {
        List.append(
          `<div class="mb-3">
            <h1 class="Title">TITLE:</h1>
            <h1> ${story.title}</h1>
            <h1 class="Body">BODY: </h1>
            <div>${story.body}</div>
            <div>
                <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
            </div>
          </div>
          <hr />`
        );
      });
    },
    error: function (error) {
      console.error("Error fetching stories:", error);
    },
  });
}

// Function to delete a story
function deleteStory() {
  let storyId = $(this).attr("data-id");
  $.ajax({   
    url: `https://jsonplaceholder.typicode.com/posts/${storyId}`,
    method: "DELETE",
    success: function () {
      displayStories(); // Refresh the list after deleting a story
    },
    error: function (error) {
      console.error("Error deleting story:", error);
    },
  });
}

// Function to handle form submission for creating or updating a story
function handleFormSubmission(event) {
  event.preventDefault();
  let storyId = $("#createBtn").attr("data-id");
  var title = $("#createTitle").val();
  var body = $("#createContent").val();
  var method, url;

  if (storyId) {
    method = "PUT";
    url = `https://jsonplaceholder.typicode.com/posts/${storyId}`;
  } else {
    method = "POST";
    url = "https://jsonplaceholder.typicode.com/posts";
  }

  $.ajax({
    url: url,
    method: method,
    data: { title, body },
    success: function () {
      displayStories(); // Refresh the list after creating/updating a story
    },
    error: function (error) {
      console.error("Error creating/updating story:", error);
    },
  });
}

// Function to handle edit button click
function editBtnClicked(event) {
  event.preventDefault();
  let storyId = $(this).attr("data-id");
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${storyId}`,
    method: "GET",
    success: function (data) {
      console.log(data);
      $("#clearBtn").show();
      $("#createTitle").val(data.title);
      $("#createContent").val(data.body);
      $("#createBtn").html("Update");
      $("#createBtn").attr("data-id", data.id);
    },
    error: function (error) {
      console.error("Error retrieving story for editing:", error);
    },
  });
}

$(document).ready(function () {
  // Initial display of stories
  displayStories();

  // Event listeners
  $(document).on("click", ".btn-del", deleteStory);
  $(document).on("click", ".btn-edit", editBtnClicked);
  $("#createForm").submit(handleFormSubmission);
  
  // Clear form button
  $("#clearBtn").on("click", function (e) {
    e.preventDefault();
    $("#clearBtn").hide();
    $("#createBtn").removeAttr("data-id");
    $("#createBtn").html("Create");
    $("#createTitle").val("");
    $("#createContent").val("");
  });
});
 