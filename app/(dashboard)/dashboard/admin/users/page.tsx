"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

import {
  ShieldCheck,
  ShieldX,
  User,
} from "lucide-react"

export default function UsersPage() {

  const [loading, setLoading] =
    useState(true)

  const [users, setUsers] =
    useState<any[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/admin/users"
          )

        setUsers(response.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  const blockUser =
    async (id: string) => {

      try {

        await axios.patch(
          "/api/admin/users/block",
          {
            id,
          }
        )

        fetchUsers()

      } catch (error) {

        console.log(error)
      }
    }

  const unblockUser =
    async (id: string) => {

      try {

        await axios.patch(
          "/api/admin/users/unblock",
          {
            id,
          }
        )

        fetchUsers()

      } catch (error) {

        console.log(error)
      }
    }

  if (loading) {

    return (
      <div className="
        flex
        h-screen
        items-center
        justify-center
      ">
        Loading...
      </div>
    )
  }

  return (
    <div className="
      min-h-screen
      bg-zinc-50
      p-6
      space-y-8
    ">

      {/* Header */}
      <div>

        <h1 className="
          text-4xl
          font-bold
          tracking-tight
        ">
          Users Management
        </h1>

        <p className="
          mt-2
          text-zinc-500
        ">
          Manage all platform users
        </p>
      </div>
      {/* Search */}
<div className="
  rounded-2xl
  border
  bg-white
  p-4
  shadow-sm
">

  <input
    type="text"
    placeholder="Search users..."
    className="
      h-12
      w-full
      rounded-xl
      border
      px-4
      text-sm
      outline-none
      focus:border-black
    "
  />
</div>

      {/* Users Table */}
      <div className="
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
      ">

        <div className="
          overflow-x-auto
        ">

          <table className="
            w-full
          ">

            <thead className="
              border-b
              bg-zinc-50
            ">

              <tr>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  User
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Phone
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Status
                </th>

                <th className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-semibold
                ">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {users.length === 0 && (
                <tr>

                  <td
                    colSpan={4}
                    className="
                      px-6
                      py-10
                      text-center
                      text-zinc-500
                    "
                  >
                    No users found
                  </td>

                </tr>
              )}

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="
                    border-b
                    last:border-0
                  "
                >

                  {/* User */}
                  <td className="
                    px-6
                    py-5
                  ">

                    <div className="
                      flex
                      items-center
                      gap-4
                    ">

                      <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-zinc-100
                      ">

                        <User className="
                          h-6
                          w-6
                          text-zinc-600
                        " />
                      </div>

                      <div>

                        <h2 className="
                          font-semibold
                        ">
                          {user.name}
                        </h2>

                        <p className="
                          text-sm
                          text-zinc-500
                        ">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="
                    px-6
                    py-5
                    text-sm
                    text-zinc-600
                  ">
                    {user.phone || "-"}
                  </td>

                  {/* Status */}
                  <td className="
                    px-6
                    py-5
                  ">

                    {user.isBlocked ? (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-red-100
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-red-700
                      ">

                        <ShieldX className="
                          h-4
                          w-4
                        " />

                        Blocked
                      </div>

                    ) : (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-emerald-700
                      ">

                        <ShieldCheck className="
                          h-4
                          w-4
                        " />

                        Active
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="
                    px-6
                    py-5
                    text-right
                  ">

                    {user.isBlocked ? (

                      <button
                        onClick={() =>
                          unblockUser(
                            user.id
                          )
                        }
                        className="
                          rounded-xl
                          bg-emerald-600
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-emerald-700
                        "
                      >
                        Unblock
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          blockUser(
                            user.id
                          )
                        }
                        className="
                          rounded-xl
                          bg-red-600
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-red-700
                        "
                      >
                        Block
                      </button>

                    )}

                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}