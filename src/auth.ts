import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import prisma from "./lib/prisma";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia (adapter, {
    sessionCookie: {
        expires: false,  // Çerez süresiz olarak geçerli
        attributes: {
            secure: process.env.NODE_ENV === "production"  // Çerezin yalnızca üretim ortamında HTTPS üzerinden gönderilmesini sağlar
        },
    },

    getUserAttributes(databaseUserAttributes) {
        return {
            id: databaseUserAttributes.id,
            username: databaseUserAttributes.username,
            displayName: databaseUserAttributes.displayname,
            avatarUrl: databaseUserAttributes.avatarUrl,
            googleId: databaseUserAttributes.googleId,

        };
    }
});

declare module "lucia" {
    interface Register {
        lucia : typeof lucia
        DatabaseUserAttributes : DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    id : string;
    username : string;
    displayname : string;
    avatarUrl : string |null ;
    googleId : string | null;

}

// `validateRequest` işlevi, cache fonksiyonuyla önbelleğe alınır ve çerezleri doğrular
export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);