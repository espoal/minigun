# Minigun

Minigun is an HTTP/X (i.e. HTTP/1.1 / 2 / 3) load and benchmarking tool, inspired by the great [Autocannon][1] and [wrk2][2].

Like them it puts a great emphasis on statistical significance, by avoiding the problem of [coordinated omission][3], and by using high precision time counters (microseconds vs milliseconds), provided by the new [Performance API][4].

Under the hood minigun is both multithreaded and asynchronous, as generating a high load is fundamental to extract statistically significant results.

I created this tool to benchmark the framework Rapido, and the various server implementations of HTTP/2 and HTTP/3. 

[1] https://github.com/mcollina/autocannon
[2] https://github.com/giltene/wrk2
[3] http://highscalability.com/blog/2015/10/5/your-load-generator-is-probably-lying-to-you-take-the-red-pi.html
