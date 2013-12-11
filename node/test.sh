curl -X PUT http://localhost:3000/problem/rr/
curl -X PUT http://localhost:3000/problem/rr/chromosome/10111010/fitness/34
curl -X PUT http://localhost:3000/problem/rr/chromosome/10101012/fitness/33
curl -X PUT http://localhost:3000/problem/rr/chromosome/10101013/fitness/88
curl  -H "Content-Type: application/json" \
    -X POST -d '{"chromstring":"10101010","fitness":177}' \
    http://localhost:3000/problem/rr
curl http://localhost:3000/chromosomes_problem/rr
curl http://localhost:3000/best_of_problem/rr