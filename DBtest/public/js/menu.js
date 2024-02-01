document.addEventListener("DOMContentLoaded", () => {
  const main_nav = document.querySelector("ul.sub_menu.notwhitespace");
  main_nav.addEventListener("click", (e) => {
    const target = e.target;
    const tagName = target.tagName;

    if (tagName === "LI") {
      const menu_text = target.textContent;

      let url = "/";

      if (menu_text === "뱀") {
        //document.location.href ="/books"
        url = "/ani1";
      } else if (menu_text === "거북이") {
        //document.location.href ="/books"
        url = "/ani2";
      } else if (menu_text === "도마뱀") {
        // document.location.href ="/books"
        url = "/ani3";
      }
      document.location.href = url;
    }
  });
});
