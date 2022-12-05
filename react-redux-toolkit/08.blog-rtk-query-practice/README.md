## onQueryStared, updateQueryData

### onQueryStarted

`onQueryStarted`는 mutation이 실행된 후에도 캐시 데이터에 업데이트를 수행하려 할 경우 사용한다. 사용자가 변경 요청을 보내 진행중인 동안에 변경사항이 즉각적인 변화를 주고싶을 때 주로 사용하는 패턴이다.

1. `onQueryStarted`는 쿼리가 시작할 때 실행된다.
2. `api.util.updateQueryData`에서 디스패치하여 캐시된 데이터를 업데이트해준다.
3. `queryFulfilled` 거부될 경우: `.undo`를 통해 롤백을 사용한다.

#### onQueryStarted(arg, { dispatch, queryFulfilled })

* `arg`: api가 요청될 때 전달되는 함수 인자
* 두 번째 인자는 `thunkApi`에서 제공해주는 메서드가 해당된다.
  * 이는 `dispatch`, `getState`, `extra`, `requestId`가 포함된다.
  * 하지만 이외에도 Promise가 queryFulfilled를 부른다.
    * 이 Promise는 요청된 리턴 값을 resolve 또는 요청이 rejected될