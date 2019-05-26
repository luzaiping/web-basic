/**
 * 命令模式是为了解决命令的请求者(Invoker)和命令的实现者(Receiver)之间的耦合关系。
 * 通过将 操作 (command) 封装成 对象, Invoker 调用 command， command 再将真正请求转给
 * Receiver
 * 
 * Redux 就是基于 命令模式， action 就是 command, Invoker 通常就是 UI， Receiver 就是 reducer
 */

// Invoker 包含对 command 的引用
// execute 触发执行，实际交由 command 执行
function Cockpit(command) {
  this.command = command;
}

Cockpit.prototype.execute = function() {
  this.command.execute()
}

Cockpit.prototype.setCommand = function(command) {
  this.command = command
}

// Receiver: 真正执行命令的对象
function Turbine() {
  this.speed = 0;
  this.state = false;
}

Turbine.prototype.on = function() {
  console.log('Turbin is on')
  this.state = true;
  this.speed = 100;
}

Turbine.prototype.off = function() {
  console.log('Turbin is off')
  this.state = false;
  this.speed = 0;
}

Turbine.prototype.speedUp = function() {
  console.log('Turbin speed up')
  if (!this.state) return;
  this.speed += 100;
}

Turbine.prototype.speedDown = function() {
  console.log('Turbin speed down')
  if (!this.state) return;
  this.speed -= 100;
}

// 具体命令，持有receiver引用
function OnCommand(turbine) {
  this.turbine = turbine;
}

// 每一个具体命令都有同样的接口
// 调用receiver对应的方法
OnCommand.prototype.execute = function() {
  this.turbine.on()
}

function OffCommand(turbine) {
  this.turbine = turbine;
}

OffCommand.prototype.execute = function() {
  this.turbine.off()
}

function SpeedUpCommand(turbine) {
  this.turbine = turbine;
}

SpeedUpCommand.prototype.execute = function() {
  this.turbine.speedUp();
};

function SpeedDownCommand(turbine) {
  this.turbine = turbine;
}

SpeedDownCommand.prototype.execute = function() {
  this.turbine.speedDown();
};

let turbine = new Turbine()
let onCommand = new OnCommand(turbine)
let cockpit = new Cockpit(onCommand)
cockpit.execute()

let offCommand = new OffCommand(turbine)
cockpit.setCommand(offCommand)
cockpit.execute()

let upCommand = new SpeedUpCommand(turbine)
cockpit.setCommand(upCommand)
cockpit.execute()

let downCommand = new SpeedDownCommand(turbine)
cockpit.setCommand(downCommand)
cockpit.execute()