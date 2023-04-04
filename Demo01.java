package cn.test;

//求100以内的偶数和
public class Demo01 {
    public static void main(String[] args) {
        int sum = 0;
        for(int i=1;i<=100;i++){
            if(i%2==0){
                continue;
            }
            sum += i;

        }
        System.out.println("偶数和为："+sum);
    }
}
