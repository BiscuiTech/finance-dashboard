<script lang="ts">
import { goto } from '$app/navigation';


  interface Data {
    symbol: string
    symbolId: number
    averageEntryPrice: number
    currentPrice: number
    currentMarketValue: number
  }
 export let data: Data[];
 const totalMarketValue = data.reduce((acc, el) => acc + el.currentMarketValue, 0)
 const handleClick = (id) => {
   goto(`/${id}`)
 }
</script>

<div class="flex flex-col">
  <div class="my-2  sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inception
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                P/L
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value $ (Portfolio %)
              </th>
<!--               <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th> -->
            </tr>
          </thead>
          <tbody>
            {#each data as item, i}
            <tr class="{i % 2 === 0 ? "bg-white" : "bg-gray-50" }" >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                on:click={() => handleClick(item.symbolId)}
              >
                {item.symbol}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                ${item.averageEntryPrice}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                ${item.currentPrice}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right
                {item.averageEntryPrice >= item.currentPrice
                  ? "text-red-500"
                  : "text-green-500"
                }">
                {((item.currentPrice / item.averageEntryPrice - 1) * 100).toFixed(2)}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                ${item.currentMarketValue} <span class="inline-block bg-gray-200 text-gray-700 rounded p-1 ml-1">({((item.currentMarketValue / totalMarketValue) * 100 ).toFixed(0)}%)</span>
              </td>
            <!--   <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td> -->
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
