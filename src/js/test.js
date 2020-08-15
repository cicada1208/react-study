
let aryTime = [3000, 2000, 1000]
let aryData = [1, 2, 3]

function getPromise2(data, time) {
    return new Promise((resolve, reject) =>
        setTimeout(resolve, time, data)
    ).then(rst => rst)
}

aryData.map((data, idx) => getPromise2(data, aryTime[idx]))
    .reduce((sequence, chapterPromise) =>
        sequence.then(() =>
            chapterPromise
        ).then(rst =>
            console.log(rst)
        )
        , Promise.resolve()
    )
