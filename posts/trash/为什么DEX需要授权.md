---
title: 为什么DEX需要授权?
description: 为什么DEX需要授权?
date: 2023-02-16
tags:
  - 区块链
---
### 前言

我们在第一次使用Uniswap这一类的DEX的时候，在swap之前，会需要进行approve的操作。这让人很疑惑，心里发问，我直接转账不就完了吗？授权啥？

今天，我们来研究下，为什么swap之前需要approve



### 协议

首先，我们以Ethereum为例，转账的都是ERC-20代币，那么我们就来直接看[ERC-20的协议标准](https://eips.ethereum.org/EIPS/eip-20)

相关的方法事件有：

```solidity
function balanceOf(address _owner) :  //查询余额
function transfer(address _to, uint256 _value) //转账
function transferFrom(address _from, address _to, uint256 _value) // 转账
function approve(address _spender, uint256 _value) // 授权
function allowance(address _owner, address _spender)  // 查询授权额度

event Transfer(address indexed _from, address indexed _to, uint256 _value) // Transfer事件
event Approval(address indexed _owner, address indexed _spender, uint256 _value) //Approval事件

```

### 代码

然后，我门直接上代码，看 [openzeppelin的实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20/ERC20.sol)

首先是全局变量和allowance和balanceOf方法

```solidity
 // 首先是两个全局变量map
 mapping (address => uint256) private _balances; // 存储地址address的余额
 mapping (address => mapping (address => uint256)) private _allowed;// 存储地址address1对address2的授权额度

// allowance方法
  function allowance(
    address owner,
    address spender
   )
    public
    view
    returns (uint256)
  {
    return _allowed[owner][spender];   // 返回_allowed 这个map中存储的：ownder对spender的授权额度
  }
  
// balanceOf方法
  function balanceOf(address owner) public view returns (uint256) {
    return _balances[owner]; //返回_balances 这个map中存储的：ownder的余额
  }


```

balanceOf方法，就是接收一个账户地址，返回该地址中这个ERC-20 token的余额

allowance方法，有两个参数，owner和spender，返回owner对spender的针对这个ERC-20 token的授权额度

然后是涉及到转账的方法，分别是transfer和transferFrom

```solidity
// transfer方法
 function transfer(address to, uint256 value) public returns (bool) {
    require(value <= _balances[msg.sender]);  // transfer的数量value要 <= msg.sender的余额
    require(to != address(0));   // 接收方to地址不能为空

    _balances[msg.sender] = _balances[msg.sender].sub(value); // msg.sender的余额扣除transfer的数量value
    _balances[to] = _balances[to].add(value); // 接收方to地址的余额增加transfer的数量value
    emit Transfer(msg.sender, to, value); // 触发Transfer事件
    return true;
  }
  
  // transferFrom方法
    function transferFrom(
    address from,
    address to,
    uint256 value
  )
    public
    returns (bool)
  {
    require(value <= _balances[from]);  // transfer的数量value要 <= 发送方from的余额
    require(value <= _allowed[from][msg.sender]); // transfer的数量value要 <= 发送方from对msg.sender的授权额度
    require(to != address(0)); //接收方to地址不为空

    _balances[from] = _balances[from].sub(value); //发送方from的余额扣除transfer的数量value
    _balances[to] = _balances[to].add(value); //接收方to的余额增加transfer的数量value
    _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value); // 发送方from对msg.sender的授权额度扣除transfer的数量value
    emit Transfer(from, to, value); // 触发Transfer事件
    return true;
  }
```

transfer方法，就是向to地址转账value个token，前提是发送方的余额要大于转账个数value

transferFrom方法，就是从from地址向to地址转账value个token，前提是发送方from的余额要大于转账个数value，同时转账的个数value要小于发送方from对msg.sender的授权额度。

大家可能会有疑问，msg.sender不就是from吗？其实不是，钱是从from这里出去到to这里的，但是发送这个动作并不是from做出的，而是一个第三方中间人(通常是合约)来做的。可以这么理解，from事先给了msg.sender自己金库的钥匙，允许msg.sender可以去from的金库里取钱，transferFrom这个动作其实就是msg.sender从from的金库里取钱发送给了to。

from把自己的金库钥匙给msg.sender这个动作，就是授权

```solidity
  function approve(address spender, uint256 value) public returns (bool) {  //接受两个参数，spender（被授权者）、value(授权额度)
    require(spender != address(0));  // 被授权者的地址不为空

    _allowed[msg.sender][spender] = value;  //msg.sender对spender授权value额度
    emit Approval(msg.sender, spender, value); //触发Approval事件
    return true;
  }
```

上面的msg.sender就是当前调用ERC-20合约方法的人，这个人可以是一个普通账户，也可以是一个合约地址。

###  总结

一般来说，transfer方法是给普通账户用的。假设当a要向一个目标地址b转账某个ERC-20代币的时候，只需要调用这个ERC-20代币的transfer方法即可，此时msg.sender，也就是方法的调用者，就是这个普通账户a。



与之对应的,transferFrom方法一般是给合约用的。首先a授权给合约b转走token的权利，a授权b的时候，msg.sender是方法approve的调用者，也就是a。

然后合约b会调用transferFrom给c转账，这个时候msg.sender就是transferFrom的调用者，也就是合约b。

授权和转账这两步，都是需要收取gas fee的



为什么合约需要这么做呢？一般情况下，a调用transfer方法给b转账1个usdt，然后就结束了。

但是如果在DEX的场景下，a想要把1个usdt换成1个usdc。在这种情况下，a在向swap合约b转账1个usdt之后，**b并不会得到任何的通知**（因为**ERC-20标准并没有规定一笔转账会通知到任何人**），所以b并不会及时地给a转账1个usdc。

这个时候就需要transferFrom登场了，a先授权给合约b转走自己usdt的权利。然后a再去调用合约b的转账方法，合约b的转账方法会调用usdt的transferFrom方法直接从a那里拿到1个usdt，只要transferFrom方法成功，合约b就知道自己一定从a那里收到了1个usdt，所以合约b就可以给a转账1个usdc





### 前端实现

合约逻辑清楚了，其实前端的实现就很简单了,这里贴一些伪代码吧

```javascript
首先声明一些变量
// 连接钱包地址 from
// 转账到的地址 to
// 调用的swap合约 SWAP
// 转账的token USDT,它的合约地址 U
// 转账USDT的数量 amount

// 调用U的合约方法allowance，判断allowance的返回值是否为0；如果不为0则直接调用SWAP合约的swap方法转账；如果allowance为0，则调用U的approve方法给SWAP合约授权,再调用SWAP合约的转账方法
   const allowed =	allowance(from，SWAP)
		if(allowed< amount){ //这里一般是写allowed === 0，因为一般授权的都是最大数量，即时这个数量会随着每次transfer而减少，但是也几乎不可能出现allowed<amount的情况
			approve(SWAP,最大数量)
		}else{
			transfer(from,to,amount)
		}

// 当然，SWAP合约的转账方法，本质上还是调用U的transferFrom方法，并在成功后会让to给from转账,其实是两笔转账(如果有流动性池，那可能是多笔)
```



#### 引申问题

1. 既然我们可以给一个合约授权，让他可以有转走我们的token的权利。那么我们可以取消授权吗？

   答案是可以，我们只需要再次调用approve方法，把approve的数量设为0即可。一些插件钱包已经实现了这个功能。

2. ETH虽然是ethereum的原生代币，但是ETH并不是ERC-20代币，那么我们该怎么在ethereum上转账ETH呢？

    答案是直接转即可，不需要授权。

3. 假如想要实现像DEX这样的使用场景，那么只有两种办法，一种就是用WETH(ERC-20)，另一种就是合约做兼容，专门处理ETH的SWAP，普遍来说就是再写一个合约方法，SWAP、SWAPETH。



### references

[what-is-the-difference-between-transfer-and-trasnferfrom](https://ethereum.stackexchange.com/questions/98892/what-is-the-difference-between-transfer-and-trasnferfrom-and-when-should-i-u)

[ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20/ERC20.sol)

[ERC-20的协议标准](https://eips.ethereum.org/EIPS/eip-20)

[how-to-do-approve-and-transferfrom-for-ether](https://ethereum.stackexchange.com/questions/28233/how-to-do-approve-and-transferfrom-for-ether)

[实现自己的ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20)
