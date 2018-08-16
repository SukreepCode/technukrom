## Techนุกรม
![](assets/logo.png)

Technology + สารานุกรม = Techนุกรม

# Instruction (แนะนำการใช้)

> อย่าอัพโหลดไฟล์ `.env`

# Start dev
Init project
```
npm install -g next now cross-env
yarn
```

Dev
```
yarn dev
```

# Deploy
Deploy to [now.sh](https://zeit.co/now)
```
yarn quick-deploy
```

Manually deploy to [now.sh](https://zeit.co/now) see more in package.json
```
yarn deploy       # deploy to now.sh
yarn alias        # alias last instance deployment
yarn deploy-clean # clean all inactive deployment
```

## Firebase
```
npm install -g firebase-tools
firebase login
firebase use
firebase deploy
```

Init for deploy on now.sh
```
now secret add firebase-api-key [FIREBASE API KEY]
```
