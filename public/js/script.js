//button-status
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {

    let url = new URL(window.location.href);
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {

            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });

    });


}

//end button-status
//form-search
const formSearch = document.querySelector("#form-search");
if (formSearch.length) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
//end form-search
//pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href)
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            url.searchParams.set("page", button.getAttribute("button-pagination"));
            window.location.href = url.href;
        })
    })
}
//end pagination