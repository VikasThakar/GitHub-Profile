async function getProfile() {
  const username = document.getElementById("usernameInput").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    console.log(data);

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src ="${data.avatar_url}"  alt ="avatar"/>
        <h2>${data.name || "Name not available"}</h2>
        <p>${data.bio || "Bio not provided"}</p>
        <p>Location: ${data.location || "Not available"}</p>
        <p>Followers: ${data.followers}</p>
      </div>
    `;
  } catch (err) {
    profileDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    console.error("Error occurred: " + err);
  }
}