function dataStatistic(data, selectorTotal, selectorChange, parm) {
    const totalAll = document.querySelector(selectorTotal);
    const newData = data.filter(item => item[parm]);

    totalAll.textContent = newData.length;

    const percentAll = document.querySelector(selectorChange);

    const currentDate = new Date();
    const thisMonth = currentDate.getMonth();
    const lastMonth = currentDate.getMonth() - 1;

    const zeroAllEgo = newData.filter(item => {
        const lastLogin = new Date(item[parm])

        return lastLogin.getMonth() == thisMonth;
    });

    const oneAllEgo = newData.filter(item => {
        const lastLogin = new Date(item[parm])

        return lastLogin.getMonth() == lastMonth;
    });

    const differentInPercent = oneAllEgo.length !== 0
        ? Math.abs((oneAllEgo.length - zeroAllEgo.length) * 100 / oneAllEgo.length)
        : 0;

    if (oneAllEgo.length > zeroAllEgo.length) {
        percentAll.className = "";
        percentAll.classList.add("content__card-change", selectorChange.replace(".", ""), "content__card-change--down");
        percentAll.textContent = `↓ ${differentInPercent}% this month`;
    } else if (oneAllEgo.length < zeroAllEgo.length) {
        percentAll.className = "";
        percentAll.classList.add("content__card-change", selectorChange.replace(".", ""), "content__card-change--up");
        percentAll.textContent = `↑ ${differentInPercent}% this month`;
    } else {
        percentAll.className = "";
        percentAll.classList.add("content__card-change", selectorChange.replace(".", ""));
        percentAll.textContent = `${differentInPercent}% this month`;
    }
}

export { dataStatistic };