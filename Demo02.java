package cn.test;

//请编写一个应用程序: 随机生成70个100以内的整数，
//统计其中大于70的个数要求输出这些数以及统计结果
public class Demo02 {
    public static void main(String[] args) {
        int count = 0;
        for (int i=0;i<70;i++){
            int num = (int)(Math.random()*100)+1;
            if(num>70){
                count++;
                System.out.print(num+" ");
            }
        }
        System.out.printf("\n大于70的随机数的共个数有："+count);
    }
}
