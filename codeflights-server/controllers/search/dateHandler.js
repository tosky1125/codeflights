const moment = require('moment');

const handlingDate = (date) => {
  let diff = moment().diff(moment([date.substring(0, 4), date.substring(4, 6) - 1, date.substring(6, 8), date.substring(8, 10), date.substring(10, 12)]), 'minutes');
  diff *= -1;
  // 출발일까지 1일 이상이 남은 경우
  if (diff / 60 > 24) {
    const day = Math.floor(diff / (60 * 24));
    const dayAccm = day * (60 * 24);
    const hour = Math.floor((diff - dayAccm) / 60);
    const hourAccm = hour * 60;
    const minutes = diff - dayAccm - hourAccm;

    // 시간이 0으로 떨어지는 경우
    if (hour === 0) {
      return `${day}일 ${minutes}분 전`;
      // 분이 0으로 떨어지는 경우
    } else if (minutes === 0) {
      return `${day}일 ${hour}시간 전`;
    }
    // 둘 다 아닌 경우
    return `${day}일 ${hour}시간 ${minutes}분 전`;

    // 출발일까지 1일 미만이 남은 경우
  } else {
    const hour = Math.floor(diff / 60);
    const hourAccm = hour * 60;

    const minutes = diff - hourAccm;

    // 분이 0으로 떨어지는 경우
    if (minutes === 0) {
      const day = Math.floor(diff / (60 * 24));
      const dayAccm = day * (60 * 24);
      const hour = Math.floor((diff - dayAccm) / 60);
      return `${day}일 ${hour}시간 전`;
    }
    // 그렇지 않은 경우
    return `${hour}시간 ${minutes}분 전`;
  }
};

module.exports = { handlingDate };
