from pynput.keyboard import Key, Listener, Controller
import time
import threading


on=True
start=False

openStock="8646"
me="88"
ae="120"
pengeluaran="40"

keyboard = Controller()

def on_press(key):
    print('{0} pressed'.format(key))
    pass

def on_release(key):
    global on, start
    print('{0} release'.format(key))
    if key == Key.shift_l:
        start=True
    if key == Key.esc:
        on = False
        return on
        sys.exit()
        
def printbot(openStock,me,ae,pengeluaran):
    keyboard.type(openStock)
    right()
    right()
    right()
    right()
    right()
    right()
    right()
    down()
    keyboard.type(me)
    keyboard.type(ae)
    keyboard.type(pengeluaran)
    sys.exit()

def tab():
    keyboard.press(Key.tab)
    keyboard.release(Key.tab)

def right():
    keyboard.press(Key.right)
    keyboard.release(Key.right)

def down():
    keyboard.press(Key.down)
    keyboard.release(Key.down)

def enter():
    keyboard.press(Key.enter)
    keyboard.release(Key.enter)
    
def hello():
    global on, start
    while on:
        while start:
            printbot(str(startnumber))
            time.sleep(3)
        
x = threading.Thread(target=hello, args=())
x.start()
with Listener(on_press=on_press, on_release=on_release) as listener:
    
    listener.join()
    
