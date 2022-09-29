import numpy
import json
from api import models
from celery.schedules import crontab
from celery.task import periodic_task

def matrix_factorization(R, V, F, K, steps=5000):

    F = F.T
    
    prev = 0
    cur = 0 
    for step in range(steps):
        for i in range(len(R)):
            for j in range(len(R[i])):
                if R[i][j] > 0:

                    eij = R[i][j] - numpy.dot(V[i,:],F[:,j])

                    for k in range(K):
                        # n = 0.0001
                        V[i][k] = V[i][k] + 0.0001 * (2 * eij * F[k][j])
                        F[k][j] = F[k][j] + 0.0001 * (2 * eij * V[i][k])


        eR = numpy.dot(V,F)

        e = 0

        #RMSE
        for i in range(len(eR)):

            for j in range(len(eR[i])):

                if eR[i][j] > 0:

                    e = e + pow(R[i][j] - numpy.dot(V[i,:],F[:,j]), 2)
                    
        cur = e

        if cur == prev:
            break

        prev = cur
        
    return V, F.T



@periodic_task(run_every=crontab(hour=0, minute=0))
def run():
    
    products = models.Product.objects.all()
    users = models.User.objects.all()
    

    #matrix will have 3 values. 
    # 2 if user has bidded to product
    # 1 if user has visited product
    # 0 if user has not seen product
    Row = []
    for user in users:
        Col = []
        for product in products:
            
            exist = models.MyBids.objects.filter(user = user).filter(product = product).exists()
            viewed = models.Product_Viewed.objects.filter(user = user).filter(product = product).exists()
            if(exist):
                Col.append(2)
            elif(viewed):
                Col.append(1)
            else:
                Col.append(0)
                
        Row.append(Col)
        
    
        

    R = numpy.array(Row)
    # N: num of User
    N = len(R)
    # M: num of Products
    M = len(R[0])
    # Num of Features
    K = 3
    
    V = numpy.random.rand(N,K)
    F = numpy.random.rand(M,K)

    

    nV, nF = matrix_factorization(R, V, F, K)

    nR = numpy.dot(nV, nF.T)


    posfound = []
    for el in nR:
        mylist = el.tolist()
        dummy = el.tolist()
        
        recuser = []
        size = 0
        
        if len(dummy) >= 5:
            size = 5
        else:
            size = len(dummy)

        for loops in range(size):
            maxel = max(dummy)
            recuser.append(mylist.index(maxel))
            dummy.remove(maxel)
        
        posfound.append(recuser)

        
    recItems = []

    for el in posfound:
        userRec = []
        for index in el:
            i = 0
            for product in products:
                if(index == i):
                    userRec.append(product._id)
                    break;
                i += 1
        
        recItems.append(userRec)


    i = 0
    mydict = {}
    for user in users:
        mydict[user.id] = recItems[i]
        i += 1

    filename = "scripts/recommend.json"
    with open(filename, "w") as file:
        json.dump(mydict,file,indent=4)
        file.close()