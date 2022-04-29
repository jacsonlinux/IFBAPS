import { Injectable } from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {CustomUser} from "./custom-user";
import {Auth, authState, GoogleAuthProvider, signInWithPopup, signOut} from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  user: Observable<CustomUser | null> = EMPTY;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    authState(this.auth)
      .pipe(map(user => !!user))
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          const userRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}`);
          this.user = docData<any>(userRef);
          this.loggedIn.next(true);
          this.router.navigate(['/dashboard']).catch(err => {
            //this.router.navigate(['/laboratories/request-repair']).catch(err => {
            console.error(err);
          });
        } else {
          console.log(isLoggedIn)
          this.loggedIn.next(false);
        }
      });
  }

  async logInGoogle() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((credential) => {
        const user: CustomUser = {
          uid: credential.user.uid,
          email: credential.user.email,
          photoURL: credential.user.photoURL ? credential.user.photoURL : `${'https://firebasestorage.' +
          'googleapis.com/v0/b/web-development-ifbaps.' +
          'appspot.com/o/angular.png?alt=media&token=' +
          '3fd02bb2-07ed-42d7-877e-9c2b08450e1d'}` ,
          displayName: credential.user.displayName,
          profile: 'public'
          // profile: (credential.user.email === 'jacsonlinux@gmail.com') ? 'technical' : 'public'
        }
        return this.updateUserData(user);
      })
      .catch(err => {
        console.error(err.message);
        return false;
      });
  }

  async updateUserData(user: CustomUser) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    return await setDoc(userRef, user, { merge: true })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      })
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']).catch(err => {console.error(err);});
      })
      .catch(err => err.message);
  }

}
