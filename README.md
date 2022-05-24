Erratic Turtle Graphics
=======================

_Try it online_ [@ catseye.tc](https://catseye.tc/installation/Erratic_Turtle_Graphics)
| _See also:_ [Maze Clouds](https://github.com/catseye/Maze-Clouds#readme)
∘ [Latcarf](https://github.com/catseye/Latcarf#readme)
∘ [Kolakoski Kurve](https://github.com/catseye/Kolakoski-Kurve#readme)

![screenshot](images/chain1.png?raw=true)

This is a gewgaw that I prototyped sometime in (I believe) 2018.
I don't remember when I had the original idea, but I think it was
not long before that.

And that idea is: turtle graphics, except there's a small
margin of error.  You might ask for "Turn right 90 degrees"
but you might get only "Turn right 89.91 degrees".

If you use a faint pen, and repeat the drawing instructions
many times over, you get a nice pencilly noisy effect.

In late 2019 I added a rudimentary command language similar to
Logo, for user-created designs.  The commands are:

    fd NUM             move forward this many pixels
    rt NUM             rotate right this many degrees
    lt NUM             rotate left this many degrees
    setxyr NUM NUM     set the coordinates, as a percentage of the
                       width and height of the canvas
    shiftxyr NUM NUM   adjust the coordinates, as a percentage of the
                       width and height of the canvas
    seterr NUM NUM     set the error rate for rotations and
                       movements respectively
    shifterr NUM NUM   adjust the error rate for rotations and
                       movements respectively
