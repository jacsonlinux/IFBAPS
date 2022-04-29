import { Injectable } from '@angular/core';
import {
  arrayUnion,
  collection, collectionData, collectionGroup, collectionSnapshots,
  docData, docSnapshots, Firestore, getDoc,
  orderBy, query, setDoc, Timestamp, updateDoc, where
} from "@angular/fire/firestore";
import {map, take, timestamp} from "rxjs/operators";
import {pipe} from "rxjs";
import {fromCollectionRef} from "@angular/fire/compat/firestore";
import {snapshotChanges} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})

export class LaboratoriesService {

  constructor(private firestore: Firestore) {
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorage.getItem(key)
  }

  clear() {
    sessionStorage.clear();
  }

  async getLaboratories() {
    return collectionData<object>(query(
      collection(this.firestore, "laboratories"), orderBy('description', 'asc')), {idField: 'id'})
      .pipe(map(collection => collection.map(laboratory => laboratory)))
  }

  async getComputers(laboratory: string) {
    return collectionData<object>(query(
      collection(this.firestore, `laboratories/${laboratory}/computers`)), {idField: 'id'})
      .pipe(map(collection => collection.map(computer => computer)))
  }

  async getMaintenances() {
    return collectionSnapshots(query(
      collectionGroup(this.firestore, 'computers'), where('maintenance.status', '==', true)))
      .pipe(map(res => res.map(computer => {
        console.log(computer);
        return computer
      })));
  }

  async requestRepair(uuid: string, comment: string, user: string) {
    return collectionSnapshots(query(
      await collectionGroup(this.firestore, 'computers'),
      where('system.uuid', '==', uuid)))
      .pipe(
        take(1),
        map(res => {
            return  res.map(computer => {
              if (computer.exists()) {
                if (computer.data().hasOwnProperty('maintenance')) {
                  const data = computer.data();
                  if (data['maintenance'].status === false) {
                    setDoc(computer.ref, {
                        maintenance: {
                          historic: arrayUnion ({user: user, comment: comment, date_open: Timestamp.fromDate(new Date())}),
                          status: true
                        }
                      }, {merge: true}
                    );
                    return { status: 1, message: 'Open call successfully' }
                  } else {
                    return { status: 2, message: 'There is an open call for this equipment' };
                  }
                } else {
                  setDoc(computer.ref, {
                    maintenance: {
                      historic: [ {
                        user: user,
                        comment: comment,
                        date_open: Timestamp.fromDate(new Date())
                      } ],
                      status: true
                    }
                  }, {merge: true} );
                  return { status: 1, message: 'Open call successfully' }
                }
              } else {
                return { status: 3, message: 'Document does not exist in database' };
              }
            });
          }
        )
      )
  }

}

/*async requestRepair(uuid: string, comment: string, user: string) {
  // this.findComputer(`${uuid}`).subscribe(res => console.log(res))
  let x;
  await this.findComputer(`${uuid}`)
    .forEach( res => {
        res.map( computer => {
            if (computer.exists()) {
              if (computer.data().hasOwnProperty('maintenance')) {
                const data = computer.data();
                if (data['maintenance'].status === false) {
                  setDoc(computer.ref, { maintenance: { status: true } }, {merge: true} );
                  x = { status: 1, message: 'Open call successfully' }
                } else {
                  x = { status: 2, message: 'There is an open call for this equipment' };
                }
              } else {
                setDoc(computer.ref, { maintenance: { status: true } }, {merge: true} );
                x = { status: 1, message: 'Open call successfully' }
              }
            } else {
              x = { status: 3, message: 'Document does not exist in database' };
            }
          }
        )
      }
    )
  console.log(x)
  return x;
}
*/

/*async requestRepair(uuid: string, comment: string, user: string) {
  await this.findComputer(`${uuid}`)
    .forEach( res => {
        res.map(computer => {
            if (computer.exists()) {
              if (computer.data().hasOwnProperty('maintenance')) {
                return true;
                /!*const data = computer.data();
                console.log(data['maintenance'].status);
                updateDoc(computer.ref,
                  { maintenance: { status: true } } )
                  .catch(err => err.message);*!/
              } else { console.log('property maintenance not exist') }
            } else { console.log('computer not exist') }
          }
        )
      }
    )
}*/

/*  findComputer(uuid: string) {
    return collectionSnapshots(query(
      collectionGroup(this.firestore, 'computers'),
      where('system.uuid', '==', uuid)))
      .pipe(
        take(1),
        map(computer => {
            return computer;
          }
        )
      )
  }*/

/*async requestRepair(uuid: string, comment: string, user: string) {
  await this.findComputer(`${uuid}`)
    .forEach( res => {
        res.map( computer => {
            if (computer.exists()) {
              if (computer.data().hasOwnProperty('maintenance')) {
                return true;
                /!*const data = computer.data();
                console.log(data['maintenance'].status);
                updateDoc(computer.ref,
                  { maintenance: { status: true } } )
                  .catch(err => err.message);*!/
              } else { console.log('property maintenance not exist') }
            } else { console.log('computer not exist') }
          }
        )
      }
    )
}*/

/*async requestRepair(uuid: string, comment: string, user: string) {
    return this.findComputer(`${uuid}`)
      .pipe(
        take(1),
        map(res => {
            res.map(computer => {
                updateDoc(computer.ref, {
                    maintenance: {status: true}
                  }
                )
                  .then(() => { return true; });
              }
            )
          }
        )
      )
  }*/

/*async maintenanceClose(ref: any) {
    await updateDoc(ref, {maintenance: {status: false}}).then(res => console.log(res, 'OK')).catch(err => console.error(err))
  }

  async maintenanceOpen(ref: any) {
    await updateDoc(ref, {maintenance: {status: true}}).then(res => console.log(res, 'OK')).catch(err => console.error(err))
  }*/

/*async getMaintenances() {
  return collectionData(query(
    collection(this.firestore, "laboratories"), orderBy('description', 'asc')), {idField: 'id'})
    .pipe(map(res => res.map( laboratory => {
      return collectionData( query(
        collection(this.firestore, `laboratories/${laboratory.id}/computers`), where('maintenance.status', '==', true)), {idField: 'id'})
        .pipe(map(res => res.map( computer => {
          return { laboratory, computer };
        } ) ) );
    } ) ) );
}*/

/*removeItem(key:string) {
    sessionStorage.removeItem(key);
  }*/

/*async getLaboratories() {
return this.laboratories  = await collectionSnapshots(query(
  collection(this.firestore, "laboratories"), orderBy('description', 'asc')))
  .pipe(map(res => res.map( laboratory => {
          const data = laboratory.data();
          const id:string = laboratory.id;
          const computersMaintenance =  collectionSnapshots(query(
            collection(this.firestore, `laboratories/${id}/computers`), where('maintenance.status', '==', true)))
            .pipe(map(res => res.map(computer => {
                    /!*const data = computer.data();*!/
                    const id:string = computer.id;
                    return { id };
                  }
                )
              )
            );
          return { id, data, computersMaintenance};
        }
      )
    )
  )
}*/

/*async getMaintenances() {
  return this.maintenances = await collectionData(query(
    collection(this.firestore, "laboratories"), orderBy('description', 'asc')), {idField: 'id'})
    .pipe(map(res => res.map( laboratory => {

      return this.computers =  collectionData( query(
        collection(this.firestore, `laboratories/${laboratory.id}/computers`), where('maintenance.status', '==', true)), {idField: 'id'})
        .pipe(map(res => res.map( computer => {

          return { laboratory, computer };
        } ) ) );
    } ) ) );
}*/

/* async getMaintenances() {
  return collectionSnapshots(query(
    collectionGroup(this.firestore, 'computers'), where('maintenance.status', '==', true)))
    .pipe(map(res => res.map( computer => {
            const data = computer.data();
            const id = computer.id;
            return { id, data };
          }
        )
      )
    );
}*/

/*async getMaintenances() {
    return collectionData(query(
      collection(this.firestore, "laboratories"), orderBy('description', 'asc')), {idField: 'id'})
      .pipe(map(res => res.map( laboratory => {
        return collectionData(query(
          collection(this.firestore, `laboratories/${laboratory.id}/computers`), where('maintenance.status', '==', true)), { idField: 'id' })
          .pipe(map(res => res.map( computer => computer ) ) );
      } ) ) );
  }*/

/*async getMaintenances() {
     return collectionData(query(
      collection(this.firestore, "laboratories"), orderBy('description', 'asc')), {idField: 'id'})
      .pipe(map(res => res.map( laboratory => {
        return collectionData(query(
          collection(this.firestore, `laboratories/${laboratory.id}/computers`), where('maintenance.status', '==', true)), { idField: 'id' })
          .pipe(map(res => res.map( computer => {
            return { laboratory, computer }
          } ) ) );
      } ) ) );
  }*/

/*  findComputer(uuid: string) {
  return collectionSnapshots(query(
    collectionGroup(this.firestore, 'computers'),
    where('system.uuid', '==', uuid)))
    .pipe(map(res => res
        .map(computer => {
            return computer.ref;
          }
        )
      )
    );
}*/

/* async requestRepair(uuid: string, comment: string, user: string) {
   await this.findComputer(`${uuid}`)
     .forEach(res => {
         console.log(res);
         res.map(ref => {
             updateDoc(ref, {
                 maintenance: {status: true}
               }
             );
           }
         )
       }
     )
 }*/

/*await this.findComputer(`${uuid}`)
.forEach(res => res.map(ref => {
      updateDoc(ref, {
          maintenance: { status: true }
        }
      );
    }
  )
);*/

/*findComputer (uuid: string) {
  return collectionSnapshots(query(
    collectionGroup(this.firestore, 'computers'),
    where('system.uuid', '==', uuid)))
    .pipe(map(res => res.map(computer => {
            return computer.ref;
          }
        )
      )
    );
}*/

/*updateDoc(ref, {
                maintenance: { status: true }
              }
            );*/

/*async requestRepair(uuid: string, comment: string, user: string) {
  await this.findComputer(`${uuid}`)
    .forEach(res => {
        console.log(res);
        res.map(ref => {
            updateDoc(ref, {
                maintenance: { status: true }
              }
            );
          }
        )
      }
    )
}*/

/*async requestRepair(uuid: string, comment: string, user: string) {
 this.findComputer(`${uuid}`)
   .subscribe(res => {
       res.map(ref => {
           updateDoc(ref, {
               maintenance: { status: true }
             }
           );
         }
       )
     }
   )
}*/
