// 1й вариант, справедлив только к "k" = 3. Иначе сколько "k", столько должно быть и циклов.
// const chooseOptimalDistance = (t, k, ls) => {
// // твій код
    
//     const totalRoute = [];      // максимально подходящие города (маршрут)
//     let maxCalcDistance = 0;  // общее расстояние между максимально подходящими городами


//     // проверка на наличие в листе городов до желаемого кол-ва.
//     if (ls.length - 1 >= k) {

//         // 1й цикл перебора 1-го слогаемого. От 1-го до 3-го с конца елемента.
//         for (let i = 0; i < ls.length - 2; i += 1) {

//             //2й цикл перебора 2-го слогаемого. От следующего после верхнего (1-го) цикла до предпоследнего елемента.
//             for (let j = i + 1; j < ls.length - 1; j +=1) {

//                 // 3й цикл перебора 3-го слогаемого. От следующего после верхнего (2-го) цикла до последнего елемента.
//                 for (let l = j + 1; l <= ls.length - 1; l += 1) {
//                     let calcDistance = ls[i] + ls[j] + ls[l];       //считаем суммы растояний каждого перебора

//                     if (calcDistance > maxCalcDistance && calcDistance <= t) {    // если текущий перебор > предыдущего и <= заданному максимальному расстоянию, то ...
//                         maxCalcDistance = calcDistance;           // ... считаем этот перебор самым подходящим (до нахождения более подходящего)
//                         totalRoute.splice(0, k, ls[i], ls[j], ls[l]);    // перезаписываем расстояния между городами подходящего перебора в массив
//                         console.log(`Сумма ${calcDistance} - пока подходит ${totalRoute}`);
//                     } else {
//                         console.log(`Сумма ${calcDistance} - не подходит`);
//                     };
//                 };
//             };
//         };

        
//         if (maxCalcDistance === 0) {
//             console.log('null!');
//             return null;
//         }

//         console.log(ls)
//         console.log(`Максимально приближенная дистанция к t=${t} это ${maxCalcDistance}, с расстояниями между ${k} городами ${totalRoute}`);
//         return maxCalcDistance;
//     };
//     console.log(ls)
//     console.log('null!');
//     return null;
// }


const chooseOptimalDistance = (t, k, ls) => {
// твій код

    // проверка на наличе достаточного кол-ва желаемых городов в списка
    if (k > ls.length) return null;

    // Факториал
    const facts = [];
    function fact(N) {
        if (N === 0 || N === 1) return 1;
        if (facts[N]) return facts[N];
        facts[N] = N * fact(N - 1);
        return facts[N];
    }
    // Количество сочетаний (комбинаций, без повторений) одномерного массива (перечня городов)
    function C(n, k) {
        return fact(n) / fact(k) / fact(n - k);
    }

    // Перебор всех комбинаций (без повторений)
    function combination(counter, k, ls) {
        const res = [0];
        const combinationCounter = []
        const n = ls.length;
        let s = 0;
        for (let t = 1; t <= k; t++) {
            let j = res[t - 1] + 1;
            //перебор подходящих индексов массива
            while ((j < (n - k + t)) && ((s + C(n - j, k - t)) <= counter)) {
                s += C(n - j, k - t);
                j++;
            }
            res.push(j);
            combinationCounter.push(ls[j-1])    // итоговый массив городов для проверки на подходящую сумму расстояний
        }
        res.splice(0, 1);
        return combinationCounter;
    }
    
    // Цикл перебора всех сочетаний (комбинаций)
    let maxCalcDistance = 0;    // Максимально приближенное (но не большее заданного ) суммарное расстояние
    let totalRoute = '';        // Перечень подходящих городов (расстояний между городами) 

    for (let i = 0; i < C(ls.length, k); i++) {
        const array1 = combination(i, k, ls);
        console.log(i, array1)

        // расстояние текущего перебора
        let summ = 0;
        for (let item of array1) {
            summ += item
        }
        console.log(`summ = ${summ}`)

        // Сравнение временной суммы растояний с максимально подходящей из прошлых переборов
        if (summ > maxCalcDistance && summ <= t) {
            maxCalcDistance = summ;
            totalRoute = array1.join(', ')
            console.log(`перезаписали maxCalcDistance ${maxCalcDistance}`)
        } else {
            console.log('Не подходит')
            
        }
        
    }

    console.log(`Максимально приближенная дистанция к t=${t} это ${maxCalcDistance}, с расстояниями между ${k} городами ${totalRoute}`);

    // проверка есть ли маршрут из городов (k), соответствующий затребованному расстоянию (t)
    if (maxCalcDistance === 0)
    return null
    return maxCalcDistance
}

chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]); //173
chooseOptimalDistance(163, 3, [50]); // null