/**
 * Created by Administrator on 14-11-30.
 */


a=[4,3,7,99,3,1,-1,-20,37,-3];

console.log(a.sort())

b=[{"3":"Jane"},{"5":"Tom"},{"1":"Mary"}];
c=[{"name":"Tom","score":99},{"name":"Jane","score":120}];

console.log(b.sort);

function SortByArrString(o1,o2)
{
    if( (o1.name)>(o2.name) ){return 1}
    else if( (o1.name)==(o2.name) ){return 0}
    else{return -1}
}
c.sort(SortByArrString)
console.log(c);