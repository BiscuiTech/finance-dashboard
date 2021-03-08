<script lang="ts">
  async function getUsers() {
    const res = await fetch("https://api.github.com/users");
    const users = await res.json();
    if (res.ok) {
      return users;
    } else {
      throw new Error(users);
    }
  }
  getUsers();
</script>
