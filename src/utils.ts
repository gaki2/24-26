export const PI2 = Math.PI * 2;

export function distance(x1: number, y1: number, x2: number, y2: number) {
  const diffX = x2 - x1;
  const diffY = y2 - y1;
  return Math.sqrt(diffX ** 2 + diffY ** 2);
}

export function lengthToRadian(stageWidth: number, fixedX: number, nowX: number, maxRotate: number) {
  const diff = nowX - fixedX;
  const rotate = -(diff / stageWidth) * maxRotate;
  return rotate;
}

function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}

export function expression() {
  const expressions = ["fun", "sleep", "normal", "wow", "normal", "normal", "normal", "normal"];
  shuffle(expressions);
  return expressions[0];
}

// 왼 -> 오의 직선 방향 ripple 일때 충돌
export const collide = (x1: number, x2: number) => {
  if (x1 >= x2) {
    return true;
  }
  return false;
};

// 원 모양의 ripple 일때 충돌
// export const collide = (x1: number, y1: number, x2: number, y2: number, r: number) => {
//   if (distance(x1, y1, x2, y2) <= r) {
//     return true;
//   }
//   return false;
// };

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 평균 0, 표준편차 1
export function normalDistribution(mean = 0, sd = 1) {
  const percent = Math.random();
  if (percent >= 0 && percent < 0.341) {
    // 평균 ~ 평균 + 표준편차 사이의 값
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean + temp * sd;
      }
    }
  } else if (percent >= 0.341 && percent < 0.682) {
    // 평균 - 표준편차 ~ 평균 사이의 값
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean - temp * sd;
      }
    }
  } else if (percent >= 0.682 && percent < 0.818) {
    // 평균 + 표준편차 ~ 평균 + 2 표준편차 사이의 값
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean + sd + temp * sd;
      }
    }
  } else if (percent >= 0.818 && percent < 0.954) {
    // 평균 - 2 표준편차 ~ 평균 - 표준편차 사이의 값
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean - sd - temp * sd;
      }
    }
  } else if (percent >= 0.954 && percent < 0.975) {
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean + 2 * sd + temp * sd;
      }
    }
  } else if (percent >= 0.975 && percent < 0.996) {
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean - 2 * sd - temp * sd;
      }
    }
  } else if (percent >= 0.996 && percent < 0.998) {
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean + 3 * sd + temp * sd;
      }
    }
  } else {
    while (true) {
      const temp = Math.random();
      if (temp < Math.random()) {
        return mean - 3 * sd - temp * sd;
      }
    }
  }
}
