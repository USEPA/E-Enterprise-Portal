/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */


export default {
  addFavoriteLink(context, newFavorite) {
    const store = context;
    const { favoriteLinks } = store.rootState.user;
    favoriteLinks.unshift(newFavorite);
  },
};
