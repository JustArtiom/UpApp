export default (time: number) =>
    new Promise((res) => {
        setTimeout(res, time);
    });
